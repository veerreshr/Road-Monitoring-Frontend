import React, { useEffect, useState } from 'react'

function Accelerometer() {
const [value,setValue]=useState({x:0,y:0})
    const freq = 10;
    useEffect(()=>{
let value=[];
        (async function(){
            try {
                if ("Accelerometer" in window) {
                    const {state} = await navigator.permissions.query({
                        name: "accelerometer"
                    });
                    if (state !== "granted") {
                        // console.warn("You haven't granted permission to use the Accelerometer sensor");
                        // errorMessage.innerHTML = "Please grant the permissio to use sensors!";
                        // alert("Please grant the permissio to use sensors!");
                        return;
                    }
    
                    const acl = new Accelerometer({ frequency: freq });
                    acl.addEventListener("activate", () => {
                        // frequency.innerHTML = freq;
                        // activated.innerHTML = "True";
                      });
                      acl.addEventListener("error", (error) => {
                        //   console.error(`Error: ${error.name}`);
                        //   errorMessage.innerHTML = `Error: ${error.name}`;
                      });
                      acl.addEventListener("reading", () => {
                        setValue({
                            x:acl.x,
                            z:acl.z
                        });
                      });
                      setInterval(()=>{
                        alert(value);
                        value=[];
                      },1000)
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
<p>X : {value.x}</p>
<p>Z : {value.z}</p>
        </div>
    )
}

export default Accelerometer
