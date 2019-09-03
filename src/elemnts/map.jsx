import React from "react";
import axios from 'axios'
import ReactDOM from "react-dom";
import distance from 'google-distance-matrix';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline
} from "react-google-maps";



const InternalMap = props => {
  let coords = []
  distance.key('AIzaSyBj0Ae2P7pCs3bl9_N6IDIIbmYKT2iY_2M');
distance.units('imperial');
  let origin =[30.7436599,76.7487577]
  let destination = [30.71909399999999,76.6760867]
  distance.matrix(origin,destination,function(err,distance){
    if(err){
      console.log(err)

    }else{
      console.log(distance)
    }
  })
  // axios.get("https://maps.googleapis.com/maps/api/directions/json?mode=DRIVING&origin=30.7436599,76.7487577&destination= 30.71909399999999,76.6760867&key=AIzaSyBj0Ae2P7pCs3bl9_N6IDIIbmYKT2iY_2M").then((result)=>{
  //   // result.routes[0].legs[0].steps.forEach((each)=>{
  //   //   coords.push(each.start_location)
  //   //   coords.push(each.end_location)
  // })
  // }).catch((err)=>{

  // })
  console.log(coords)

return (


    
     

  <GoogleMap defaultZoom={7} defaultCenter={{ lat: 30.7438002, lng: 76.737543 }}>

    <Polyline
      path={coords}
    />
  </GoogleMap>
)
};

const MapHoc = withScriptjs(withGoogleMap(InternalMap));

const MyMapComponent = props => (
  <MapHoc
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBj0Ae2P7pCs3bl9_N6IDIIbmYKT2iY_2M&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);
 
export default MyMapComponent;