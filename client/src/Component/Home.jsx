import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contest from "./Contest/Contest";
import Question from "./Question/Question";
import Ide from "./IDE/Ide";
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
          </Switch>
        </div>
      </Router>
    </div>
  );
}   

  