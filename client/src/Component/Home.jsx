import React, { useState } from "react";
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
import MyQuestionList from "./Question/MyQuestionList";
import MyCode from "./IDE/MyCode";
import Index from "./Index";
import ShowCode from "./IDE/ShowCode";
import ForgotPassword from "./Register/ForgotPassword";
export default function Home() {
  const [flag , setFlag]= useState(false);
  
  return (
    <div>
      <Router>
        <Navbar title= "Dcoder" flag={flag}  setFlag= {setFlag}/>
        {/* <div className="container"> */}
        <div>
          <Switch>
            <Route path="/contest">
              <Contest />
            </Route>
            <Route exact path="/ide">
              <Ide codeId="" save={true}/>
            </Route>
            <Route
                exact
                path="/ide/:codeId"
                render={(props) => <Ide codeId={props.match.params.codeId} save={true} />}
              />
            <Route
                exact
                path="/code/:id"
                render={(props) => <Ide  codeId = {props.match.params.id} save={false} />}
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
            <Route exact path="/ForgotPassword">
              <ForgotPassword/>
            </Route>
            <Route path="/Login" >
              <Login  flag={flag}  setFlag= {setFlag}/>
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
            
            <Route path='/myQuestionList'>
              <MyQuestionList/>
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

  