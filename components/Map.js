/*global google*/
import React, { Component, useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';

import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
import coordinates from "../store/ducks/coordinates";

export default function Map () {
  const [directions, setDirections] = React.useState(null)

  const coordinates = useSelector((state) => state.coordinates);

  useEffect(() => {
    console.log('COORDENADAS: ', coordinates)
  }, [coordinates])
  // const center = { lat: (props.latOrigin+props.latDestination)/2, lng: (props.lgnOrigin+props.lgnDestination)/2 }

  // useEffect(() => {
  //   const directionsService = new google.maps.DirectionsService();

  //   const origin = { lat: props.latOrigin, lng: props.lgnOrigin };
  //   const destination = { lat: props.latDestination, lng: props.lgnDestination };

  //   directionsService.route(
  //     {
  //       origin: origin,
  //       destination: destination,
  //       travelMode: google.maps.TravelMode.DRIVING
  //     },
  //     (result, status) => {
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         setDirections(result)
  //       } else {
  //         console.error(`error fetching directions ${result}`);
  //       }
  //     }
  //   );
  // }, [])

  // const GoogleMapExample = withGoogleMap(props => (
  //   <GoogleMap
  //     defaultCenter={center}
  //     defaultZoom={15}
  //   >
  //     <DirectionsRenderer directions={directions} />
  //   </GoogleMap>
  // ));

  return (
    <div>
      {/* <GoogleMapExample
        containerElement={<div style={{ height: `500px`, width: "500px" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
       */}
       {JSON.stringify(coordinates)}
    </div>
  )
}
// class Map extends Component {
//   state = {
//     directions: null
//   };

//   componentDidMount() {
//     const directionsService = new google.maps.DirectionsService();

//     const origin = { lat: -9.6713288, lng: -35.7224261 };
//     const destination = { lat: -9.5430303, lng: -35.8063573 };

//     directionsService.route(
//       {
//         origin: origin,
//         destination: destination,
//         travelMode: google.maps.TravelMode.DRIVING
//       },
//       (result, status) => {
//         if (status === google.maps.DirectionsStatus.OK) {
//           this.setState({
//             directions: result
//           });
//         } else {
//           console.error(`error fetching directions ${result}`);
//         }
//       }
//     );
//   }

//   render() {
//     const GoogleMapExample = withGoogleMap(props => (
//       <GoogleMap
//         defaultCenter={{ lat: -9.60717955, lng: -35.7643917 }}
//         defaultZoom={15}
//       >
//         <DirectionsRenderer directions={this.state.directions} />
//       </GoogleMap>
//     ));

//     return (
//       <div>
//         <GoogleMapExample
//           containerElement={<div style={{ height: `500px`, width: "500px" }} />}
//           mapElement={<div style={{ height: `100%` }} />}
//         />
//       </div>
//     );
//   }
// }

// export default Map;
