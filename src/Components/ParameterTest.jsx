import React, { useEffect, useState } from "react";
import SensorCard from './SensorCard';
import { Accelerometer } from 'motion-sensors-polyfill';

function ParameterTest() {
  let accelerometer=new Accelerometer({frequency:30});
  const [activated,setActivated]=useState(false);
  useEffect(()=>{
    console.log(accelerometer)
  if(accelerometer.activated){
    setActivated(true);
  }
  },[accelerometer])
  return <div>
   <SensorCard x={accelerometer.x} y={accelerometer.y}  z={accelerometer.z} timestamp={accelerometer.timestamp} lat={10} long={10}/>
  </div>;
}

export default ParameterTest;
