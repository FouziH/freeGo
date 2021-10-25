import React from 'react';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'

/**
 * Notifications Component
 * This component renders our hazard list in a list format / non card
 */

function Notification() {
  const dashBoard = useSelector((store) => store.dashBoardReducer);
  console.log('dashboadr stasdf', dashBoard);
  const getCardInfo = (id) => {
    console.log("card info id is", id);
    history.push(`/details/${id}`)
  }

  return (
    <div className="container">

      <table className="table">
        <thead>
          <tr>
            <th>Alert</th>
            <th>Threat</th>
            <th>Date /Time</th>
            <th>Location</th>
            <th>REMOVE</th>
          </tr>
        </thead>

      <tbody>
        {dashBoard.length > 0 ? (
          dashBoard.map((items, i) => (
              <tr>
                <td>{items.name}</td>
                <td>{items.threat_level}</td>
                <td>{items.created_date}</td>
                <td>
                    <div className="map-card-location">
                      <FontAwesomeIcon icon={faMapMarkedAlt} />
                      {items.street}, {items.city}, {items.state}, {items.zip}
                    </div>
                  </td>
                <td><button className="btn btn-danger">REMOVE</button></td>
              </tr>
          ))
        ) : (
          <p>Loading...</p>
        )}
    </tbody>
    </table>
  </div>
  );
}

export default Notification;
