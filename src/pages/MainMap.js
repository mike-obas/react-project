import React, {useState} from 'react';
import useStyles from '../styles/Map'
import { Typography } from '@material-ui/core';
import { 
  GoogleMap, LoadScript, Marker, 
  InfoWindow, StreetViewPanorama, InfoBox 
} from "@react-google-maps/api";


function MapContainer (){
  const classes = useStyles()
    const [ selected, setSelected ] = useState({});
    const [streetView, setStreetView] = useState(false)
    const defaultCenter = {
      lat: 6.459801090919547, 
       lng: 3.197214647239389
    }
    const [streetAddress, setStreetAddress] = useState(defaultCenter)
    const onSelect = item => {
        setSelected(item);
        setStreetAddress(item.location);
      }
    const hanldeStreetView = () => {
      setStreetView(true)
    }
  const mapStyles = {        
    height: "80vh",
    width: "100%"
};
const locations = [
    {
      name: "Corporate office B417, Alaba international market, Ojo. Lagos, Nigeria",
      infoName: "N-tek head office",
      location: { 
        lat: 6.460610426754166, 
        lng: 3.1866195014462733
      },
    },
    {
      name: "Shop 14 Ground floor Reco plaza complex, Opposite MTN office by sunny bus stop along ojo. Alaba intl market road, Ojo. Lagos",
      infoName: "N-tek branch office",
      location: { 
       lat: 6.459801090919547, 
       lng: 3.197214647239389
      },
    },
    
  ];
  const options = { closeBoxURL: '', enableEventPropagation: true };
  
  return (
    <div className="pageComponents">
     <LoadScript
       googleMapsApiKey='use-own-api-key'
       >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={14}
          center={defaultCenter}
          >
      <StreetViewPanorama
      position={streetAddress}
      visible={streetView}
      
      onCloseClick={() => setStreetView(false)}
      />
         {
            locations.map(item => {
              return (
              <Marker 
              key={item.name} 
              position={item.location}
              onClick={() => onSelect(item)}
              title={item.label}
              />
              )
            })
         }
         {
             selected.location && 
             (
               <InfoWindow
               position={selected.location}
               onCloseClick={() => setSelected({})}
             >
               <div className={classes.streetView}>
               <h3 style={{textAlign: 'left'}}>{selected.name}</h3>
               <button
               onClick={hanldeStreetView}
               >
                 street view
                 </button>
               </div>
             </InfoWindow>
             )
         }
         {
             locations.map(item => {
              return (
         <InfoBox
      options={options}
      position={item.location}
      key={item.infoName}
    >
      <div className={classes.infoBox}>
        <Typography variant="body2" className={classes.infoBoxText}>
          {item.infoName}
        </Typography>
      </div>
    </InfoBox>
    )
})
}
     </GoogleMap>
     </LoadScript>
     </div>
  )
}
export default MapContainer;

//Another google-maps library example
// import React from 'react'
// import GoogleMapReact from 'google-map-react'
// import { IconButton } from '@material-ui/core';
// import LocationIcon from '@material-ui/icons/Room';
// import useStyles from '../styles/Map'

// function MainMap() {
//     const classes = useStyles()
//     const location = {
//         address: 'Corporate office B417 Alaba international market Ojo',
//         lat: 6.459801090919547, 
//         lng: 3.197214647239389
//       }

//       const LocationPin = ({ text }) => (
//         <div className={classes.pin}>
//           <IconButton className={classes.iconBtn}>
//             <LocationIcon className={classes.pinIcon} />
//             </IconButton>
//           <p className={classes.pinText}>{text}</p>
//         </div>
//       )

//     return (
//         <div className={classes.googleMap}>
//         <GoogleMapReact
//         bootstrapURLKeys={{ 
//           key: 'use-own-api-key'
//         }}
//         defaultCenter={location}
//         defaultZoom={15}
//       >
//         <LocationPin
//           lat={location.lat}
//           lng={location.lng}
//           text={location.address}
//         />
//       </GoogleMapReact>
//       </div>
//     )
// }

// export default MainMap
