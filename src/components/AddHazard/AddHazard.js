import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Geocode from "react-geocode";
import PageHeader from '../PageHeader/PageHeader';

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
    const hazardReducer = useSelector(store => store.hazardReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        // Is there an `:id` param in the URL?
        if (params.id === undefined) {
            // Create mode
            // localhost:3000/hazard
            // Reset store.hazardReducer = {}
            dispatch({
                type: 'CLEAR_HAZARD'
            })
        }
        else {
            // Edit mode
            // localhost:3000/jobEntry/:id
            // GET /jobEntries/:id
            // Save results to store.editJobEntry
            dispatch({
                type: 'FETCH_HAZARD_TO_EDIT',
                payload: params.id
            })
        }
    }, [params.id]);

    const handleHome = () => {
        dispatch({
            type: 'CLEAR_HAZARD'
        })
        history.push('/home');
    }

    const handleChange = (event) =>{
        dispatch({
            type: 'UPDATE_EDIT_HAZARD',
            payload: {
                ...hazardReducer, 
                [event.target.name]: event.target.value
            }
        })
      };

    const getUserLocal = (event) => {
        event.preventDefault();
        if(hazardReducer.street && hazardReducer.city && hazardReducer.state && hazardReducer.zip) {
            let address = hazardReducer.street + ' ' + hazardReducer.city + ' ' + hazardReducer.zip;
            Geocode.fromAddress(address).then(
                (response) => {
                  const { lat, lng } = response.results[0].geometry.location;
                  let hazardLocal = {...hazardReducer, latitude:lat, longitude: lng};
                  handleSubmit(hazardLocal);
                },
                (error) => {
                  console.error(error);
                }
            );
        }
    }

    const handleSubmit = (hazardLocal) => {
        console.log('hazard before dispatch', hazardLocal);
        dispatch({
            type: 'ADD_EDIT_HAZARD',
            payload: hazardLocal
        })
        dispatch({
            type: 'CLEAR_HAZARD'
        })
        dispatch({
            type: "FETCH_HAZARD",
            payload: {latitude: hazardLocal.latitude, longitude: hazardLocal.latitude}
        });
        history.push('/home');
        location.reload();
    }

    const handleFill = () => {
        dispatch({
            type: 'UPDATE_EDIT_HAZARD',
            payload: {
                ...hazardReducer,
                name: 'Car Accident',
                description: 'Red Honda hit tree on ninth',
                street: '9th Ave S',
                city: 'Minneapolis',
                state: 'MN',
                zip: '55404',
                image: 'https://picsum.photos/200',
                threat_level: 'moderate',
                genre_id: '1'
            }
        })
    }

    return (
        <div className="container-fluid">
            <PageHeader 
            title =
            {params.id === undefined ?
                "Add Hazard" :
                "Edit Hazard"
            }
            description = "Here you can add a hazard - temp description"
            />
            <button className="btn btn-secondary" onClick={handleHome}> add icon Home</button>
            <br />
            
            <h1 onClick={handleFill}>
                {params.id === undefined ?
                    "Add Hazard" :
                    "Edit Hazard"
                }
            </h1>
            <div className="container">
                <form className="card card-form" onSubmit={getUserLocal}>
                    <div className="form-group">
                        <input 
                            className="form-control"
                            placeholder="name"
                            name='name'
                            value={hazardReducer.name}
                            onChange={handleChange}
                        />               
                    </div>
                    <div className="form-group">
                        <textarea 
                            className="form-control"
                            placeholder="description"
                            name='description'
                            rows="4"
                            value={hazardReducer.description}
                            onChange={handleChange}
                        >
                        </textarea>
                    </div>
                    <div className="form-group">
                        <input 
                            className="form-control"
                            placeholder="street"
                            name='street'
                            value={hazardReducer.street}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            className="form-control"
                            placeholder="city"
                            name='city'
                            value={hazardReducer.city}
                            onChange={handleChange}
                        />                    
                    </div>
                    <input 
                        className="form-control"
                        placeholder="state"
                        name='state'
                        value={hazardReducer.state}
                        onChange={handleChange}
                    />
                    <div className="form-group">
                        <input 
                            className="form-control"
                            placeholder="zip"
                            name='zip'
                            value={hazardReducer.zip}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            className="form-control"
                            placeholder="image"
                            name='image'
                            value={hazardReducer.image}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label for="threatLevel">Hazard Threat Level:</label>
                        <select className="form-control" name="threat_level" id="threatLevel" value={hazardReducer.threat_level} onChange={handleChange}>
                            <option selected disabled>Select A Threat Level</option>
                            <option value="low">Low</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="genre">Hazard Genre:</label>
                        <select className="form-control" name="genre_id" id="genre" value={hazardReducer.genre_id} onChange={handleChange}>
                            <option selected disabled >Select A Genre</option>
                            <option value="1">CRIME</option>
                            <option value="2">ROAD WORK</option>
                            <option value="3">ACCIDENT</option>
                            <option value="4">OTHER</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" type="submit">
                    {params.id === undefined ?
                        "Submit" :
                        "Save"
                    }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddHazard

