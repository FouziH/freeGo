import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../HazardManagement/HazardManagement.css'
import HazardManagementItem from '../HazardManagementItem/HazardManagementItem'


export default function HazardManagement() {
 
    const dispatch = useDispatch();
    const dashBoard = useSelector(store => store.dashBoardReducer);

    useEffect(() => {
    dispatch({ type: 'FETCH_DASHBOARD'})
    }, []);

    return (
       <div className="container">
      {dashBoard.length > 0 ? (
        dashBoard.map((items, i) => (
          <div key={i}>
            <HazardManagementItem items={items} />{" "}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

