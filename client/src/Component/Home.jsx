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
import MyCode from "./IDE/MyCode";
import Index from "./Index";
export default function Home() {
  return (
    <div>
      <Router>
        <Navbar title= "Dcoder" />
        {/* <div className="container"> */}
        <div>
          <Switch>
            <Route path="/contest">
              <Contest />
            </Route>
            <Route exact path="/ide">
              <Ide codeId=""/>
            </Route>
            <Route
                exact
                path="/ide/:codeId"
                render={(props) => <Ide codeId={props.match.params.codeId} />}
              />

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
            <Route path='/myCode'>
              <MyCode/>
            </Route>
            <Route path='/'>
              <Index/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}   

  