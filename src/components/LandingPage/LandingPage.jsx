import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import { useDispatch, useSelector } from "react-redux";
import LandingPageItems from "../LandingPageItems/LandingPageItems";

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDashboard();
    fetchOpenMinneapolisAPI();
  }, []);

  //fetches dashboard data from the database
  function fetchDashboard() {
    dispatch({
      type: "FETCH_DASHBOARD",
    });
  }

  function fetchOpenMinneapolisAPI() {
    dispatch({
      type: "FETCH_OPEN_MINNEAPOLIS_API",
    });
  }

  const dashBoard = useSelector((store) => store.dashBoardReducer);
  console.log("dashboard is", dashBoard);

  const openMinneapolisAPI = useSelector((store) => store.openMinneapolisApi);
  console.log("open Minneapolis api is", openMinneapolisAPI);

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
