import React from "react";
import '../LandingPage/LandingPage.css'

export default function LandingPageItems({ items }) {
  return (
    <>
   
      <div className="image-container">
        <img src={items.image} alt="" />
      </div>
      <div className="information-conatiner">
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
      </div>
    </>
  );
}
