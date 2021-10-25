import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import { useDispatch, useSelector } from "react-redux";
import LandingPageItems from "../LandingPageItems/LandingPageItems";

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_DASHBOARD",
    });
  }, []);


  const dashBoard = useSelector(store => store.dashBoardReducer)
  console.log("dashboard is", dashBoard)

  return (
    <div className="container">
      {dashBoard.length > 0 ? (
        dashBoard.map((items, i) => (
          <div key={i}>
            <LandingPageItems items={items} />{" "}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
