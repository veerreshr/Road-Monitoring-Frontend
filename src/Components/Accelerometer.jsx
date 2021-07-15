import React, { useEffect, useState } from 'react'

function Accelerometer() {
    const freq = 30;
    useEffect(()=>{
        const errorMessage = document.getElementById("error");
        const frequency = document.getElementById("frequency");
        const activated = document.getElementById("activated");
        const x = document.getElementById("x");
        const y = document.getElementById("y");
        const z = document.getElementById("z");
        (async function(){
            try {
                if ("Accelerometer" in window) {
                    const {state} = await navigator.permissions.query({
                        name: "accelerometer"
                    });
                    if (state !== "granted") {
                        console.warn("You haven't granted permission to use the Accelerometer sensor");
                        errorMessage.innerHTML = "Please grant the permissio to use sensors!";
                        alert("Please grant the permissio to use sensors!");
                        return;
                    }
    
                    const acl = new Accelerometer({ frequency: freq });
                    acl.addEventListener("activate", () => {
                        frequency.innerHTML = freq;
                        activated.innerHTML = "True";
                      });
                      acl.addEventListener("error", (error) => {
                          console.error(`Error: ${error.name}`);
                          errorMessage.innerHTML = `Error: ${error.name}`;
                      });
                      acl.addEventListener("reading", () => {
                        x.innerHTML = acl.x;
                        y.innerHTML = acl.y;
                        z.innerHTML = acl.z;

                      });
                      acl.start();
    
                }else{
                    console.error("Sorry! Your browser doesn't support usage of sensors.");
                    errorMessage.innerHTML = "Sorry! Your browser doesn't support usage of sensors.";
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
            Frequency: <span id="frequency"></span> <br />
            Activated: <span id="activated"></span> <br />
            X: <span id="x"></span><br />
            Y: <span id="y"></span><br />
            Z: <span id="z"></span><br />
            Error: <span id="error"></span><br />
        </div>
    )
}

export default Accelerometer
