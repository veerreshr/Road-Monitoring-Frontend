import {
  GoogleMap,
  Marker,
  LoadScript,
  Polyline,
  Circle,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import firebase from './../Utils/firebase';

function MapContainer() {
  const potholeRef = firebase.database().ref("annomalies/potholes");

  const mapStyles = {
    height: "90vh",
    width: "100%",
  };
  const [potholes, setPotholes] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({});
  const [pathCoordinates, setPathCoordinates] = useState([]);

  const success = (position) => {
    const currentPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    pushToPathCoordinates(currentPos);
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

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
    potholeRef.once("value", (snap) => {
      let data=snap.val()
    let temp = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        temp.push({
          lat: data[key].lat,
          lng: data[key].lng,
          key:key
        });
      }
    }
    setPotholes(temp);
  });
  potholeRef.on('child_added', (snap, prevChildKey) => {
    let data=snap.val()
    setPotholes(prev=>prev.concat({
        lat: data.lat,
        lng: data.lng,
        key:snap.key
    }));
  });
    return () =>{ navigator.geolocation.clearWatch(id);
      potholeRef.off();
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={18}
        center={currentPosition}
      >
        {currentPosition.lat && <Marker position={currentPosition} />}
        {pathCoordinates && (
          <Polyline
            path={pathCoordinates}
            geodesic={true}
            options={{
              strokeColor: "#ff2527",
              strokeOpacity: 0.75,
              strokeWeight: 2,
              // icons: [
              //   {
              //     icon: lineSymbol,
              //     offset: "0",
              //     repeat: "20px",
              //   },
              // ],
            }}
          />
        )}
        {potholes.length > 0 &&
          potholes.map((pothole,i) => (
            <Circle
            key={pothole.key+" "+i}
              options={{
                center: { 
                    lat:parseFloat( pothole.lat),
                    lng:parseFloat( pothole.lng),
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
  );
}

export default MapContainer;
