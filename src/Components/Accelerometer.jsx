import React, { useEffect, useState } from 'react'

function Accelerometer() {
    const [activated,setActivated]=useState(false);
    // const [error,setError]=useState("");
    const [z,setZ]=useState(0);
    const freq = 30;
    const getData()=>{
        let limit=0;
        window.setInterval(() => {

          }, 1000)
    }
    useEffect(()=>{
        (async function(){
            try {
                if ("Accelerometer" in window) {
                    const {state} = await navigator.permissions.query({
                        name: "accelerometer"
                    });
                    if (state !== "granted") {
                        console.warn("You haven't granted permission to use the Accelerometer sensor");
                        alert("Please grant the permissio to use sensors!");
                        return;
                    }
    
                    const acl = new Accelerometer({ frequency: freq });
                    acl.addEventListener("activate", () => {
                        setActivated(true);
                      });
                      acl.addEventListener("error", (error) => {
                          console.error(`Error: ${error.name}`);
                        alert(`Error: ${error.name}`);
                      });
                      acl.addEventListener("reading", () => {
                        // z.innerHTML = acl.z;

                      });
                      acl.start();
    
                }else{
                    console.error("Sorry! Your browser doesn't support usage of sensors.");
                    alert("Sorry! Your browser doesn't support usage of sensors.");
                }
            } catch (error) {
                    // Handle construction errors.
    if (error.name === 'SecurityError') {
        console.log('Sensor construction was blocked by the Permissions Policy.');
    } else if (error.name === 'ReferenceError') {
        console.log('Sensor is not supported by the User Agent.');
    } else {
        throw error;
    }
            }

        }());
    },[])

    return (
        <div>
            
        </div>
    )
}

export default Accelerometer
