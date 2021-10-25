import { useState } from "react";
import { useDispatch } from "react-redux";
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
//TODO = create env variable
Geocode.setApiKey("AIzaSyBbtf3Ot3DoK8yxfVML3Hfg2HdcIYwa-MM");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// // A Geocoding request with region=es (Spain) will return the Spanish city.
// Geocode.setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();


function AddHazard() {
    const dispatch = useDispatch()
    const [address, setAddress] = useState();
    const [hazard, setHazard] = useState({
        name: '',
        description: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        image: '',
        latitude: '',
        longitude: ''
    });


    const getUserLocal = (event) => {
        event.preventDefault();
        if(hazard.street && hazard.city && hazard.state && hazard.zip) {
            let address = hazard.street + ' ' + hazard.city + ' ' + hazard.zip;
            Geocode.fromAddress(address).then(
                (response) => {
                  const { lat, lng } = response.results[0].geometry.location;
                  console.log('lat and lng converted from address', lat, lng);
                  let hazardLocal = {...hazard, latitude:lat, longitude: lng};
                  console.log('hazard is before local', hazard);
                  handleSubmit(hazardLocal);
                },
                (error) => {
                  console.error(error);
                }
            );
        }
    }

    const handleSubmit = (hazardLocal) => {
        console.log('hazard after local', hazardLocal);
        dispatch({
            type: 'ADD_hazard',
            payload: hazardLocal
        })
    }

    return (
        <div>
            <h1>Add A hazard</h1>
            <form onSubmit={getUserLocal}>
                <input 
                    placeholder="name"
                    name='name'
                    value={hazard.name}
                    onChange={(event) => setHazard({...hazard, name:event.target.value})}
                />
                <textarea 
                    placeholder="description"
                    name='description'
                    rows="4"
                    value={hazard.description}
                    onChange={(event) => setHazard({...hazard, description:event.target.value})}
                >
                </textarea>
                <input 
                    placeholder="street"
                    name='street'
                    value={hazard.street}
                    onChange={(event) => setHazard({...hazard, street:event.target.value})}
                />
                <input 
                    placeholder="city"
                    name='city'
                    value={hazard.city}
                    onChange={(event) => setHazard({...hazard, city:event.target.value})}
                />
                <input 
                    placeholder="state"
                    name='state'
                    value={hazard.state}
                    onChange={(event) => setHazard({...hazard, state:event.target.value})}
                />
                <input 
                    placeholder="zip"
                    name='zip'
                    value={hazard.zip}
                    onChange={(event) => setHazard({...hazard, zip:event.target.value})}
                />
                <input 
                    placeholder="image"
                    name='image'
                    value={hazard.image}
                    onChange={(event) => setHazard({...hazard, image:event.target.value})}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddHazard

