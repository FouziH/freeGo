import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import { useDispatch, useSelector } from "react-redux";
import LandingPageItems from "../LandingPageItems/LandingPageItems";
import AddHazardButton from "../AddHazardButton/AddHazardButton";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import PageHeader from '../PageHeader/PageHeader';

export default function LandingPage({location}) {
  const history = useHistory();
  const dashBoard = useSelector((store) => store.dashBoardReducer);
  const user = useSelector(store => store.user);

  const getCardInfo = (id) => {
    history.push(`/details/${id}`)
  }

  const getCardInfo2 = (item) => {
    history.push({
      pathname: '/detail-external',
      state: item
    })
  }

  return (
    <>
      <PageHeader 
        title = 'Hazards'
        description = 'Stay Safe'
      />
      <AddHazardButton />
      <div className="container">
        <div className="row">
          {dashBoard.length > 0 ? (
            dashBoard.map((items, i) => (
              <>
                <div className="col-sm-6">
                  {items.is_minn == true ? (
                    <div className="card hazard-card" key={i} onClick={() => getCardInfo2(items)}>
                      <a href="https://opendata.minneapolismn.gov/datasets/cityoflakes::police-incidents-2021/about"  target="_blank" className="badge badge-primary">Source: External API</a>
                      <div className="row no-gutters">
                        <div className="image-container col-sm-4">
                          <img src={items.image} alt=""/>
                        </div>
                      < LandingPageItems items={items} />{" "}
                      
                    </div>
                  </div>
                  ) : (
                    <div className="card hazard-card" key={i} onClick={() => getCardInfo(items.id)}>
                      <span className="badge badge-pill badge-primary">Source: User Submitted</span>
                      <div className="row no-gutters">
                        <div className="image-container col-sm-4">
                          <img src={items.image} alt=""/>
                        </div>
                      < LandingPageItems items={items} />{" "}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ))
          ) : (
            <p>NO RESULTS...</p>
          )}
        </div>
      </div>
      <FilterDrawer location={location} />
    </>
  );
}
