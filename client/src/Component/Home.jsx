import React from "react";
import Navbar from "./Navbar";
import Register from "./Register/Register";
import Login from "./Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contest from "./Contest/Contest";
import Question from "./Question/Question";
import Ide from "./IDE/Ide";
import Otp from "./Register/Otp";
import Profile from "./Profile/Profile";
import QuestionList from "./Question/QuestionList";
import QuestionWriter from "./Question/QuestionWriter";
import QuestionEditor from "./Question/QuestionEditor";
export default function Home() {
  return (
    <div>
      <Router>
        <Navbar title= "Dcoder" />
        <div className="container">
          <Switch>
            <Route path="/contest">
              <Contest />
            </Route>
            <Route path="/IDE">
              <Ide />
            </Route>
            <Route exact path="/questionList">
              <QuestionList />
            </Route>

            <Route
                exact
                path="/question/editor/:id"
                render={(props) => <QuestionEditor id={props.match.params.id} />}
              />
            <Route
                exact
                path="/question/:id"
                render={(props) => <Question id={props.match.params.id} />}
              />
            <Route exact path="/Register">
              <Register />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/register/otp">
              <Otp/>
            </Route>
            <Route path="/modifyProfile">
              <Profile/>
            </Route>
            <Route path='/questionWriter'>
              <QuestionWriter/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}   

  