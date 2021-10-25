import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBell, faMapMarkedAlt, faUserAlt, faCog } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">freeGo</a>
          <div class="" id="navbarSupportedContent">
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
                            <span className="">
                              Profile
                            </span>
                          </Link>
                        </li>
                        <li><hr className="dropdown-divider"></hr></li>
                        <li><LogOutButton className="navLink btn btn-danger btn-normalize" /></li>
                      </ul>
                    </li>
                  </>
                )}
              </li>
            </ul>
          </div>
      </div>
    </nav>
  );
}

export default Nav;
