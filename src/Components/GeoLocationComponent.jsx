import React, { useEffect, useState } from 'react'

function GeoLocationComponent() {
    const [error,setError]=useState("");

    const showPosition=(position)=>{
        console.log(position)
    }
    const err=()=>{
        setError("Unable to retrieve your location");
    }

    useEffect(()=>{
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition,err,{enableHighAccuracy:true,timeout :Infinity});
        }else{
            setError("Geolocation is not supported by this browser.");
        }
    },[])
    return (
        <div>
            
        </div>
    )
}

export default GeoLocationComponent
