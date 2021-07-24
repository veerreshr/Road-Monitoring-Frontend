import {
  GoogleMap,
  Marker,
  LoadScript,
  Polyline,
  Circle,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import firebase from "./../Utils/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  buttonsContainer: {
    marginTop: "0.5em",
  },
  button: {
    width: "100%",
  },
}));

function MapContainer() {
  const classes = useStyles();

  const potholeRef = firebase.database().ref("annomalies/potholes");

  const mapStyles = {
    height: "75vh",
    width: "100%",
  };
  const [potholes, setPotholes] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({});
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [start, setStart] = useState(false);

  const success = (position) => {
    const currentPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPos);
  };
  const error = (err) => {
    alert(err);
  };

  const pushToPathCoordinates = (currentPos) => {
    let pathco = pathCoordinates;
    pathco.push(currentPos);
    setPathCoordinates(pathco);
  };

  const distance = (coords1, coords2) => {
    const { lat: lat1, lng: lon1 } = coords1;
    const { lat: lat2, lng: lon2 } = coords2;
    const degToRad = (x) => (x * Math.PI) / 180;
    const R = 6371;
    const halfDLat = degToRad(lat2 - lat1) / 2;
    const halfDLon = degToRad(lon2 - lon1) / 2;
    const a =
      Math.sin(halfDLat) * Math.sin(halfDLat) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(halfDLon) *
        Math.sin(halfDLon);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  const beep = new Audio(
    "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.wav"
  );
  const playAudio = () => {
    if (!start) return beep.pause();
    beep.currentTime = 0;
    beep.play();
  };

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
    potholeRef.once("value", (snap) => {
      let data = snap.val();
      let temp = [];
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          temp.push({
            lat: data[key].lat,
            lng: data[key].lng,
            key: key,
          });
        }
      }
      setPotholes(temp);
    });
    potholeRef.on("child_added", (snap, prevChildKey) => {
      let data = snap.val();
      setPotholes((prev) =>
        prev.concat({
          lat: data.lat,
          lng: data.lng,
          key: snap.key,
        })
      );
    });
    return () => {
      navigator.geolocation.clearWatch(id);
      potholeRef.off();
    };
  }, []);

  const successPath = (position) => {
    if (start) {
      const currentPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      pushToPathCoordinates(currentPos);
    } else {
      setPathCoordinates([]);
    }
  };

  useEffect(() => {
    console.log(pathCoordinates)
    const checkfornearbypotholes = setInterval(() => {
      if (start) {
        for (let pothole of potholes) {
          if (distance(pothole, currentPosition) < 100) {
            playAudio();
            break;
          }
        }
      } else {
        beep.pause();
      }
    }, 1000);

    const id = navigator.geolocation.watchPosition(successPath, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
    return () => {
      navigator.geolocation.clearWatch(id);
      clearInterval(checkfornearbypotholes);
    };
  }, [start]);
  return (
    <>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={18}
          center={currentPosition}
        >
          {pathCoordinates && (
            <Polyline
              path={pathCoordinates}
              geodesic={true}
              options={{
                path: {pathCoordinates},
                strokeColor: '#00ffff',
                strokeOpacity: 1,
                strokeWeight: 6,
                icons: [{
                    offset: '0',
                    repeat: '10px'
                }],
            }}
            />
          )}
          {currentPosition.lat && <Marker position={currentPosition} />}
          {potholes.length > 0 &&
            potholes.map((pothole, i) => (
              <Circle
                key={pothole.key + " " + i}
                options={{
                  center: {
                    lat: parseFloat(pothole.lat),
                    lng: parseFloat(pothole.lng),
                  },
                  radius: 4,
                  strokeColor: "#FF0000",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  fillColor: "#FF0000",
                  fillOpacity: 0.8,
                }}
              />
            ))}
        </GoogleMap>
      </LoadScript>
      Status: {start ? "Running" : "Stopped"}
      <Grid container spacing={2} className={classes.buttonsContainer}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(e) => {
              e.preventDefault();
              setStart(true);
            }}
          >
            Start
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={(e) => {
              e.preventDefault();
              setStart(false);
            }}
          >
            Stop
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default MapContainer;
