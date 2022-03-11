import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar(props) {
  function handleLogout() {
    props.setFlag(!props.flag);
    localStorage.removeItem("user");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand"  to="/" style={{ color: "#e8ba68" }}>
          {"</"} {props.title} {">"}
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/ide">
                IDE
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/contest"
              >
                Upcoming Contest
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/questionList"
              >
                Questions
              </Link>
            </li>
            {JSON.parse(localStorage.getItem("user")) && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/myCode"
                >
                  My code
                </Link>
              </li>
            )}
            {/* {JSON.parse(localStorage.getItem("user")) && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/modifyProfile"
                >
                  Modify profile
                </Link>
              </li>
            )} */}
          </ul>
          {localStorage.getItem("user") ? (
            <form className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item active dropdown">
                  <Link
                    className="nav-link active dropdown-toggle"
                    to="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "white" }}
                  >
                    Hello {JSON.parse(localStorage.getItem("user")).fName}
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li className="nav-item">
                      <Link
                        className="nav-link "
                        aria-current="page"
                        to="/modifyProfile"
                        style={{ color: "black" }}
                      >
                        Modify profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/myQuestionList">
                        My Question
                      </Link>
                    </li>
                  </ul>
                </li>
                <Link
                  className="btn btn-primary mx-1"
                  onClick={handleLogout}
                  role="button"
                >
                  Logout
                </Link>
              </ul>
            </form>
          ) : (
            <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link
                className="btn btn-primary mx-1"
                to="/register"
                role="button"
              >
                Signup
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
