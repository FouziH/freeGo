import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import { useDispatch, useSelector } from "react-redux";

export default function LandingPage() {
  const dispatch = useDispatch();
  const dashBoard = useSelector(store => store.dashBoardReducer)

  useEffect(() => {
    dispatch({
      type: "FETCH_DASHBOARD",
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="image-container">
          <img
            src="https://images.pexels.com/photos/6044744/pexels-photo-6044744.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
          />
        </div>
        <div className="information-conatiner">
          <h3 className="Hazard-Genre">Stolen street Sign</h3>
          <h3 className="threat">Hazard Threat Level</h3>
          <div className="status">
            <p>Status: Approved</p>
          </div>
          <div className="address">
            <p>733 Balthazar St, Mankato MN</p>
          </div>
        </div>
      </div>
    </>
  );
}
