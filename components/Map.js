/*global google*/
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { 
  LinearProgress
} from "@material-ui/core";

import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from "react-google-maps";

export default function Map () {
  const [directions, setDirections] = React.useState(null)

  const coordinates = useSelector((state) => state.coordinates);
  const center = { lat: (coordinates.latOrigin+coordinates.latDestination)/2, lng: (coordinates.lgnOrigin+coordinates.lgnDestination)/2 }

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

      const origin = { lat: coordinates.latOrigin, lng: coordinates.lgnOrigin };
      const destination = { lat: coordinates.latDestination, lng: coordinates.lgnDestination };

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result)
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
  
  }, [coordinates])

  const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap
      defaultCenter={center}
      defaultZoom={10}
    >
      <DirectionsRenderer directions={directions} />
    </GoogleMap>
  ));

  return (
    <div>
      <GoogleMapExample
        containerElement={<div style={{ height: "500px", width: "500px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  )
}