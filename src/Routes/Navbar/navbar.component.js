import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer/footer.component";
import React from "react";

const Navbar = () => {
  const navig = useNavigate();
  function logout() {
    localStorage.clear();
    navig("/logout");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="https://sanofi.com">
            R-celer Healthcare
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/"}
                  >
                    Home
                  </Link>
                </li>
                {(localStorage.status === "doctor" ||
                  localStorage.status === "project-manager") && (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={"/trials"}
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Clinical Trial
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      {localStorage.status === "doctor" && (
                        <>
                          <li>
                            <Link className="dropdown-item" to={"/listMyTrial"}>
                              List my clinical trials
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to={"/patientToTrial"}
                            >
                              Add patient to Clinical trial
                            </Link>
                          </li>
                        </>
                      )}
                      {localStorage.status === "project-manager" && (
                        <>
                          <li>
                            <Link className="dropdown-item" to={"/siteToTrial"}>
                              Add site to Clinical trial
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to={"/docToTrial"}>
                              Add doctor to Clinical trial
                            </Link>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <Link className="dropdown-item" to={"/trials"}>
                              List trials
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to={"/trial"}>
                              Create trial
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </li>
                )}
                {localStorage.status === "project-manager" && (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={"listSites"}
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sites
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to={"listSites"}>
                          View Sites
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"createSite"}>
                          Create a new site
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"/addDocToSite"}>
                          Add a doc in site
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
                {(localStorage.status === "doctor" ||
                  localStorage.status === "project-manager") && (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={"users"}
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Userbase
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to={"createUser"}>
                          Create user
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"users"}>
                          List users
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
                {localStorage.status === "doctor" && (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={"meetingView"}
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Meetings
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to={"/meetingView"}>
                          Meeting dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"/createMeeting"}>
                          Create meeting
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {(localStorage.status === "patient" ||
            localStorage.status === "doctor" ||
            localStorage.status === "project-manager") && (
            <>
              <div className="d-flex">
                <button
                  id="logoutBtn"
                  className="btn btn-outline-dark"
                  onClick={() => logout()}
                >
                  LogOut
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Navbar;
