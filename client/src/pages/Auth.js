import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import './Auth.css';

class Analysis extends Component{
  render(){
    return(
      <BrowserRouter>
        <React.Fragment>
          <div className="auth_selection">
            <ul>
              <li>
                <NavLink to ="/auth/signup">SIGN UP</NavLink>
              </li>
              <li>
                <NavLink to ="/auth/login">LOGIN</NavLink>
              </li>
            </ul>
          </div>
          <main>
            <Switch>
              <Route path="/auth/signup" component={Signup}/>
              <Route path="/auth/login" component={Login}/>
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default Analysis;
