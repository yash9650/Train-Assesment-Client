import React from "react";
import { Link, Outlet } from "react-router-dom";

export const CustomNavbar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Book Train
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" aria-current="page" to="/">
                Trains
              </Link>
              <Link className="nav-link" aria-current="page" to="/ticket-queue">
                Ticket Queue
              </Link>
            </div>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>
      <div className="app-container">
        <Outlet />
      </div>
    </React.Fragment>
  );
};
