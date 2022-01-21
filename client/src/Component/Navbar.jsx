import React from "react";
import { Link } from "react-router-dom";
export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/IDE"
              >
                IDE
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/contest"
              >
                Contest
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/question"
              >
                Question
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/modifyProfile"
              >
                Modify profile
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <Link className="btn btn-primary mx-1" to="/login" role="button">
              Login
            </Link>
            <Link className="btn btn-primary mx-1" to="/register" role="button">
              Signup
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
}
