import React, { useEffect, useState } from 'react'
import AlertComponent from './AlertComponent';

function DeviceData() {
    const [values,setValue]=useState([]);
    const [error, setError] = useState("");
    const [active, setActive] = useState(false);


    const acl = new Accelerometer({ frequency: 30 });
    const start = async () => {
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
            acl.addEventListener("activate", () => {
              setActive(true);
            });
            acl.addEventListener("error", (err) => {
              console.error(`Error: ${err.name}`);
              setError(`Error: ${err.name}`);
            });
    
            acl.addEventListener("reading", () => {
              setValue([acl.x,acl.z,acl.timestamp]);
            });
              acl.start();
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

      useEffect(()=>{
          start();
          return()=>{
              acl.stop();
          }
      },[])
    return (
        <div>
            {error && <AlertComponent data={error} />}
            {active && <div>
                X: {values[0]} <br />
                Z: {values[1]} <br />
                Timestamp: {values[2]} <br />
                </div>}
            
        </div>
    )
}

export default DeviceData
