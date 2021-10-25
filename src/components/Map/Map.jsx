import React from 'react';
import { Map, TileLayer, Marker, Popup, } from 'react-leaflet'
import L, { map } from 'leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import "leaflet/dist/leaflet.css";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapComponent({address}) {
  /**
   * Map Component
   * Utilizes react-leaflet, Leaflet
   * Pulls precipitation and cloud data from Open Weather Map API
   */
  return (
    <>
      <h1>{address}</h1>
      <Map center={address} zoom={14} style={{ height: "100vh" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      <Marker position={address}>
        <Popup>
            <span>
              A pretty CSS3 popup. <br/> Easily customizable.
            </span>
        </Popup>
      </Marker>
        <FullscreenControl />
      </Map>
    </>
  );
}

export default MapComponent;
