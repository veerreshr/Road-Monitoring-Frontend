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
    let pathco = [...pathCoordinates];
    pathco.push(new window.google.maps.LatLng(currentPos.lat,currentPos.lng));
    setPathCoordinates(pathco);
  };

  const rad = function(x) {
    return x * Math.PI / 180;
  };

  const distance = (p1, p2) => {
    let R = 6378137; // Earth’s mean radius in meter
    let dLat = rad(p2.lat - p1.lat);
    let dLong = rad(p2.lng - p1.lng);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // returns the distance in meter
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
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
      };
      pushToPathCoordinates(currentPos);
    } else {
      setPathCoordinates([]);
    }
  };

  useEffect(() => {
    const checkfornearbypotholes = setInterval(() => {
      if (start) {
        let found=false;
        for (let pothole of potholes) {
          if (distance(pothole, currentPosition) < 30) {
            playAudio();
            found=true;
            break;
          }
        }
        if(!found){
          beep.pause();
        }
      } else {
        beep.pause();
      }
    }, 500);

    const id = navigator.geolocation.watchPosition(successPath, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
    return () => {
      navigator.geolocation.clearWatch(id);
      clearInterval(checkfornearbypotholes);
    };
  }, [start,currentPosition]);

  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths:{pathCoordinates},
    zIndex: 1
  };
  const onLoad = polyline => {
    console.log('polyline: ', polyline)
  };
  return (
    <>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={18}
          center={currentPosition}
        >
          {pathCoordinates.length > 0 && (
            <Polyline
            onLoad={onLoad}
            path={pathCoordinates}
            // options={options}
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
