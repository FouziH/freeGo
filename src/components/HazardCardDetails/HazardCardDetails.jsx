import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function HazardCardDetails() {
  const history = useHistory()
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;
  const user = useSelector(store => store.user);
  const detail = useSelector((store) => store.cardDetails);
  const genre = useSelector((store) => store.hazardGenre);
  const [flaggedHazard, setFlaggedHazard] = useState({});


  useEffect(() => {
    dispatch({
      type: "FETCH_HAZARD_CARD_DETAIL",
      payload: id,
    });
  }, []);

  useEffect(() => {
    getHazardGenre()
   
  }, [])

  const getHazardGenre = () => {
     dispatch({
       type: "FETCH_HAZARD_GENRE",
     });
  }

  const handleChange = (event) => {
    console.log({...flaggedHazard, 
      [event.target.name]: event.target.value});

    setFlaggedHazard({
      ...flaggedHazard, 
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = (hazardId) => {
    console.log({...flaggedHazard, hazardId});
    dispatch({ 
      type: 'ADD_FLAGGED_HAZARD', 
      payload: {...flaggedHazard, hazardId}
    });
  };

  const changeStatus = (items) => {
    let cardDetails = detail[0];
    console.log({
      ...cardDetails,
      approved: (!items.approved)
    });

    dispatch({
      type: 'ADD_EDIT_HAZARD',
      payload: {
        ...cardDetails,
        approved: (!items.approved)
      }
  })

    alert('Status Changed!');
    history.push('/home');
  }

  return (
    <>
      {detail.length > 0 ? (
        detail.map((items, i) => (
          <div key={i}>
            <div>
              <img src={items.image} alt="image" />
            </div>
            <div>
              <h4>
                <span>Moderate</span>
              </h4>
              <h4>
                {items.approved === true ? (
                  <span>Status: Approved</span>
                ) : (
                  <span>Status: Pending</span>
                )}
                <br/>
                {user.role === 1 &&
                  <button onClick={() => changeStatus(items)}>Change Status</button>
                }
              </h4>
              <div>
                <h2>{items.name}</h2>
                <p>{items.description}</p>
              </div>
              <h4>Hazard Genre: {items.title}</h4>
              <p>
                {" "}
                <i className="fa fa-map-marker"></i> {items.street},{" "}
                {items.city} {items.state}
              </p>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div>
              {user.role !== 1 &&
                  <button 
                    type="button" class="btn btn-primary" 
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal"
                  >
                    Report Hazard
                  </button>
              }
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Choose Reason For Inaccuracy</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div className="form-group">
                            <label for="flagDescription">Reason:</label>
                            <select className="form-control" name="description" id="flagDescription" value={flaggedHazard.description} onChange={handleChange}>
                                <option value="">Select A Reason</option>
                                <option value="Hazard No Longer Exists">Hazard No Longer Exists</option>
                                <option value="Information Is Inaccurate">Information Is Inaccurate</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleSubmit(items.id)}>Submit</button>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-dismiss="modal"
                          onClick={() => handleSubmit(items.id)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div> 
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
