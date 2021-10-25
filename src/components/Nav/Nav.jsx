import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBell, faMapMarkedAlt, faUserAlt, faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    // <div className="nav">
    //   <Link to="/home">
    //     <h2 className="nav-title">freeGo - Logo HERE</h2>
    //   </Link>
    //   <div>
    //     {/* If no user is logged in, show these links */}
    //     {user.id === null &&
    //       // If there's no user, show login/registration links
    //       <Link className="navLink" to="/login">
    //         Login / Register
    //       </Link>
    //     }

    //      {user.id === null &&
    //       // If there's no user, show login/registration links
    //       <Link className="navLink" to="/">
    //         Login / Register
    //       </Link>
    //     }


    //     {/* If a user is logged in, show these links */}
    //     {user.id && (
    //       <>
    //         <Link className="navLink" to="/home">
    //           Home
    //         </Link>

    //         <Link className="navLink" to="/map">
    //           Map View Temporary
    //         </Link>

    //         <Link className="navLink" to="/info">
    //           Info Page
    //         </Link>

    //         <LogOutButton className="navLink" />
    //       </>
    //     )}

    //     <Link className="navLink" to="/about">
    //       About
    //     </Link>
    //   </div>
    // </div>


  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">freeGo</a>
      {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button> */}
      <div class="" id="navbarSupportedContent">
      {/* <div class="collapse navbar-collapse" id="navbarSupportedContent"> */}
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            {/* If no user is logged in, show these links */}
            {user.id === null &&
              // If there's no user, show login/registration links
              <Link className="navLink" to="/login">
                Login / Register
              </Link>
            }
          </li>
          <li class="nav-item">
            {user.id === null &&
            // If there's no user, show login/registration links
              <Link className="navLink" to="/">
                Login / Register
              </Link>
            }
          </li>
          <li className="nav-item nav-item-flex">
            {/* If a user is logged in, show these links */}
            {user.id && (
              <>
                <Link className="navLink" to="/home">
                  <FontAwesomeIcon icon={faHome} />
                  <span className="hide-on-mobile">
                    Home
                  </span>
                </Link>

                <Link className="navLink" to='/notifications/{user.id}'>
                  <FontAwesomeIcon icon={faBell} />
                  <span className="hide-on-mobile">
                    Notifications
                  </span>
                </Link>

                <Link className="navLink" to="/map">
                  <FontAwesomeIcon icon={faMapMarkedAlt} />
                  <span className="hide-on-mobile">
                    Map
                  </span>
                </Link>

                <li className="nav-item navLink dropdown">
                  <a className="navLink dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FontAwesomeIcon icon={faCog} />
                    <span className="hide-on-mobile">
                      Settings
                    </span>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="navLink" to="/user">
                        <FontAwesomeIcon icon={faUserAlt} />
                        <span className="hide-on-mobile">
                          Profile
                        </span>
                      </Link>
                    </li>
                    {/* <li><a className="dropdown-item" href="#">Another action</a></li> */}
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><LogOutButton className="navLink btn btn-danger" /></li>
                  </ul>
                </li>
              </>
            )}
          </li>
        </ul>
        {/* <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form> */}
      </div>
    </div>
  </nav>

  );
}

export default Nav;
