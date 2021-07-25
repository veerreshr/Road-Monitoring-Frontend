import {
  GoogleMap,
  Marker,
  LoadScript,
  Polyline,
  Circle,
} from "@react-google-maps/api";
import { useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import firebase from "./../Utils/firebase";

function UploadMap() {
  const uploadRef = firebase.database().ref("annomalies/potholes");
  const accelerometer = new Accelerometer({ frequency: 30 });
  const start = useStoreState((state) => state.upload.start);

  const mapStyles = {
    height: "75vh",
    width: "100%",
  };
  const [potholes, setPotholes] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({});
  const [pathCoordinates, setPathCoordinates] = useState([]);

  const success = (position) => {
    const currentPos = {
      lat:parseFloat( position.coords.latitude),
      lng:parseFloat( position.coords.longitude)
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
  const startReadingAccelerometer = async () => {
    try {
      if ("Accelerometer" in window) {
        const { state } = await navigator.permissions.query({
          name: "accelerometer",
        });
        if (state !== "granted") {
          console.warn(
            "You haven't granted permission to use the Accelerometer sensor"
          );
          setError("Please grant the permission to use sensors!");
          return;
        }
        accelerometer.addEventListener("error", (err) => {
          console.error(`Error: ${err.name}`);
          setError(`Error: ${err.name}`);
        });
        let minTimestamp = 0;
        accelerometer.addEventListener("reading", () => {
          if (accelerometer.z > 16 && accelerometer.timestamp >= minTimestamp) {
            uploadRef.push(currentPosition);
            minTimestamp = accelerometer.timestamp + 2000;
          }
        });
        accelerometer.start();
      } else {
        console.error("Sorry! Your browser doesn't support usage of sensors.");
        setError("Sorry! Your browser doesn't support usage of sensors.");
      }
    } catch (err) {
      if (err.name === "SecurityError") {
        console.warn(
          "Sensor construction was blocked by the Permissions Policy."
        );
        setError("Sensor construction was blocked by the Permissions Policy.");
      } else if (err.name === "ReferenceError") {
        console.warn("Sensor is not supported by the User Agent.");
        setError("Sensor is not supported by the User Agent.");
      } else {
        throw err;
      }
    }
  };

  const polylineOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: { pathCoordinates },
    zIndex: 5,
  };
  const onLoad = (polyline) => {
    console.log("polyline: ", polyline.paths);
  };
  useEffect(() => {
    const id = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
    uploadRef.once("value", (snap) => {
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
    
    uploadRef.on("child_added", (snap, prevChildKey) => {
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
      uploadRef.off();
      accelerometer.stop();
    };
  }, []);

  const successPath = (position) => {
    if (start) {
      const currentPos = {
        lat:parseFloat( position.coords.latitude),
        lng: parseFloat(position.coords.longitude)
      };
      pushToPathCoordinates(currentPos);
    } else {
      setPathCoordinates([]);
    }
  };

  useEffect(() => {
    if (start) {
      startReadingAccelerometer();
    } else {
      accelerometer.stop();
    }
    const id = navigator.geolocation.watchPosition(successPath, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, [start]);
  return (
    <>
      {currentPosition.lat && (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={18}
            center={currentPosition || { lat: 20.5937, lng: 78.9629 }}
          >
             {pathCoordinates.length > 0 && (
            <Polyline
            onLoad={onLoad}
            path={pathCoordinates}
            strokeColor= "#000000"
            // strokeOpacity= "1.0"
            // strokeWeight= "4"
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
      )}
    </>
  );
}

export default UploadMap;
