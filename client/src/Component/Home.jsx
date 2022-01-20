import React from "react";
import Navbar from "./Navbar";
import Register from "./Register/Register";
import Login from "./Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contest from "./Contest/Contest";
import Question from "./Question/Question";
import Ide from "./IDE/Ide";
import Otp from "./Register/Otp";
export default function Home() {
  return (
    <div>
      <Router>
        <Navbar title= "Online Coding Platform" />
        <div className="container">
          <Switch>
            <Route path="/contest">
              <Contest />
            </Route>
            <Route path="/IDE">
              <Ide />
            </Route>
            <Route path="/Question">
              <Question />
            </Route>
            <Route exact path="/Register">
              <Register />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>o
            <Route path="/register/otp">
              <Otp/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}   

  