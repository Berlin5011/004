import React from 'react';
import {NavLink} from 'react-router-dom';
import "./Nav.css";
import AuthContext from '../../context/auth-context';

const mainNavbar = props => (
  <AuthContext.Consumer>
    {(context)=>{
      return(
        <header className="mainnavbar">
          <nav className="nav__content">
            <div className="nav_logo">
              <NavLink to="/">PAGE</NavLink>
            </div>
            <div className="nav_item">
              <ul>
                {context.token &&<li>
                  <NavLink to="/devicemanager">Device Manager</NavLink>
                </li>}
                <li>
                  <NavLink to="/Analysis">Analysis</NavLink>
                </li>
                {!context.token &&
                  <li>
                    <NavLink to="/auth">Sign Up/Login</NavLink>
                  </li>
                }
                {!context.token &&
                <li>
                  <NavLink to="/oauth">Oauth</NavLink>
                </li>
                }
                {context.token &&<li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>}
              </ul>
            </div>
          </nav>
        </header>
      )
  }}
  </AuthContext.Consumer>
)

export default mainNavbar;
