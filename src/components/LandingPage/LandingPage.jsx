import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import { useDispatch, useSelector } from "react-redux";
import LandingPageItems from "../LandingPageItems/LandingPageItems";
import AddHazardButton from "../AddHazardButton/AddHazardButton";
import FilterDrawer from "../FilterDrawer/FilterDrawer";

export default function LandingPage({location}) {
  const history = useHistory();
  const dashBoard = useSelector((store) => store.dashBoardReducer);
  const user = useSelector(store => store.user);

  const getCardInfo = (id) => {
    console.log("card info id is", id);
    history.push(`/details/${id}`)
  }

  return (
    <>
      <AddHazardButton />
      <div className="container">
        <div className="row">
          {dashBoard.length > 0 ? (
            dashBoard.map((items, i) => (
              <>
                <div className="col-sm-6">
                  <div className="card hazard-card" key={i} onClick={() => getCardInfo(items.id)}>
                    <div className="row no-gutters">
                      <div className="image-container col-sm-4">
                        <img src={items.image} alt=""/>
                      </div>
                      <LandingPageItems items={items} />{" "}
                    </div>
                  </div>
                </div>
              </>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <FilterDrawer location={location} />
    </>
  );
}
