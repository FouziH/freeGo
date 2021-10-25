import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapComponent from '../Map/Map'
import Geocode from "react-geocode";
import PageHeader from '../PageHeader/PageHeader';
import useCurrentLocation from "../../hooks/useCurrentLocation";
import useWatchLocation from "../../hooks/useWatchLocation";
import { geolocationOptions } from "../../constants/geolocationOptions";
import { useInterval } from '../../hooks/useInterval';
import {  addDays, subDays } from 'date-fns';

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();


function MapContainer({userLocation}) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');
  const [genre, setgenre] = useState('');
  const [threat_level, set_threat_level] = useState('%');
  const [mapaddress, setmapaddress] = useState();
  const { location, cancelLocationWatch, error } = useWatchLocation(geolocationOptions);
  const [isWatchinForLocation, setIsWatchForLocation] = useState(true);
  const dashBoard = useSelector(store => store.dashBoardReducer);

  const [created_date, setCreated_Date] = useState([
    {
      startDate: subDays(new Date(), 30),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  
  /**
   * Map Component
   * Utilizes react-leaflet, Leaflet
   * Pulls precipitation and cloud data from Open Weather Map API
   */

    /**
   * Use Effect for user location
   * utilizes hook useWatchLocation
   */
  useEffect(() => {
    if (!location) return;
    // Cancel location watch after 3sec
    setTimeout(() => {
      cancelLocationWatch();
      setIsWatchForLocation(false);
    }, 3000);
  }, [location, cancelLocationWatch]);


  function getLocation() {
    let today = new Date();
    let priorDate = new Date().setDate(today.getDate()-30) // <-- 30 represents the number of days to go back from the current_date (TODAY)
    setCreated_Date({
      startDate: subDays(new Date(), 30),
      endDate: addDays(new Date(), 7),
      key: "selection",
    });

    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setmapaddress([lat, lng]);;
        dispatch({
          type: "FETCH_HAZARD",
          payload: {
            date: created_date,
            genreTitle: genre,
            userLatLng: {latitude: lat, longitude: lng},
            threat_Level: threat_level,
          },
        });
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * Is watching for location
   * this is required due to map render prior to getting back user lat / lng from Navigator.geolocation
   */
   if (isWatchinForLocation) {
    return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
  }

  return (
    <>
      <PageHeader 
        title = "Map"
        description = "View hazards on map - temp description"
      />
      <div className="container">
        <div className="form-group map-container-group">
          <div class="input-group mb-3">
            <input
                onChange={event => setAddress(event.target.value)}
                className="form-control"
                value={address}
                placeholder="Address / Location"
            />
            <input
              onChange={event => setgenre(event.target.value)}
              className="form-control"
              value={genre}
              placeholder="Genre"
            />
            <select
              className="form-control"
              name="threatLevel"
              id="threatLevel"
              value={threat_level}
              onChange={(e) => set_threat_level(e.target.value)}
            >
              <option selected>Select A Threat Level</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>

            <div class="input-group-append">
            <button className="btn btn-primary" onClick={getLocation}>Find Location</button>
            </div>
          </div>
        </div>
        {mapaddress ? (
          <MapComponent 
            address = {mapaddress}
          />
        ) : (
          <MapComponent 
            address = {location}
          />
        )}
      </div>

    </>
  );
}

export default MapContainer;
