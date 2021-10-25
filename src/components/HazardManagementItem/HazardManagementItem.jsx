import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function HazardManagementItem(items) {

  
//Set up for the dispatch
  const dispatch = useDispatch();

   //Needed state to process the delete button
  const [deleteItems, setDeleteItems] = useState([]);

 const handleDelete = () => {
    console.log("delete clicked for: ", deleteItems);
    dispatch({
      type: "DELETE_SESSION",
      payload: deleteItems,
    });
  };

 

    return (
        <>
      <div className="image-container container-fluid ">
        <img src={items.image} alt="" />
      </div>
      <div className="col-sm-7">
        <h3 className="Hazard-Genre">{items.name}</h3>
        <h3 className="threat">
         <span>{items.title}</span>
        </h3>
        <h3 className="threat">
          Threat Level {items.threat_level}
        </h3>
        <div className="status">
          <p className="threatLevel">
            Status:{" "}
            {items.approved === true ? (
              <span>Approved</span>
            ) : (
              <span>Not approved</span>
            )}
          </p>
        </div>
        <div className="address">
          <p>
            <i className="fa fa-map-marker"></i> {items.street}, {items.city}{" "}
            {items.state}
          </p>
        </div>
        <button onclick={handleDelete}> </button>
      </div>
    </>
    )
}
