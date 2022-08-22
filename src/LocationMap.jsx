import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import mark from "./location.png"


export default function MapLocation() {
  const [viewport, setViewport] = useState({ });

  useEffect(() => {
        
        setViewport({
                latitude: 24.873901,
                longitude: 67.061645,
                width: window.innerWidth < 600 ? `${window.innerWidth - 20}px` : '1000px' ,
                height: "550px",
                zoom: 15
        })

  }, [ ])


 return (
    <div style={{textAlign:'center'}}>
      <div style={{display:'inline-block'}}>
      <ReactMapGL
        {...viewport }
        mapboxApiAccessToken={"pk.eyJ1Ijoic3llZGFzaGFyMSIsImEiOiJja250MWRkMWcxMjU5MnBwZjBzazhtYjllIn0.k04cOm_P5xwbnQiSXE7puw"}
        mapStyle="mapbox://styles/syedashar1/cknt31gyl0s1v17o3z4riwmle"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
            <Marker
            key={1}
            latitude={24.873901}
            longitude={67.061645}
          >
        <img src = {mark} style={{width:'30px',height:'auto',marginTop:'-25px'}}>

        </img>
        

          </Marker>
        

      </ReactMapGL>
    </div>
    </div>
  );
}