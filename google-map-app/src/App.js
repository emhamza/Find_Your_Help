import React from 'react';
import { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow
} from '@vis.gl/react-google-maps';

const App = () => {
  const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.REACT_APP_GOOGLE_MAPS_MAP_ID;

  console.log("API Key:", apiKey);
  console.log("Map ID:", mapId);

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: "100vh" }}>
        <Map
          zoom={9}
          center={position}
          mapId={mapId}
        >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin background={"gray"} borderColor={'blue'} glyphColor={'yellow'} />
          </AdvancedMarker>

          {open && (<InfoWindow position={position} onCloseClick={() => setOpen(false)}>
            <p>I am the info window</p>
          </InfoWindow>)}
        </Map>
      </div>
    </APIProvider>
  );
};

export default App;
