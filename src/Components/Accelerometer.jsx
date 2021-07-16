import React, { useEffect, useState } from 'react'
import AlertComponent from './AlertComponent';

function AccelerometerComponent() {
    const [error,setError]=useState("");
    const [active,setActive]=useState(false);
const [value,setValue]=useState({x:0,z:0})
const acl = new Accelerometer({ frequency: 30 });
    useEffect(()=>{

            (async function(){
                try {
                    if ("Accelerometer" in window) {
                        const {state} = await navigator.permissions.query({
                            name: "accelerometer"
                        });
                        console.log(state);
                        if (state !== "granted") {
                            console.warn("You haven't granted permission to use the Accelerometer sensor");
                            setError("Please grant the permission to use sensors!");
                            alert("Please grant the permission to use sensors!");
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
                            setValue({
                                x:acl.x,
                                z:acl.z
                            });
                          });
                          acl.start();
                    }else{
                        console.error("Sorry! Your browser doesn't support usage of sensors.");
                        setError("Sorry! Your browser doesn't support usage of sensors.");
                        alert("Sorry! Your browser doesn't support usage of sensors.");
                    }
                } catch (err) {
                    // Handle construction errors.
                    if (err.name === 'SecurityError') {
                        console.log('Sensor construction was blocked by the Permissions Policy.');
                    } else if (err.name === 'ReferenceError') {
                        console.log('Sensor is not supported by the User Agent.');
                    } else {
                        throw err;
                    }
                }
            }());


    },[])


    return (
        <div>
            {error && <AlertComponent data={error}/>}
            {active && <div>
                <p>X : {value.x}</p>
                <p>Z : {value.z}</p>
                </div>}
        </div>
    );
}

export default AccelerometerComponent
