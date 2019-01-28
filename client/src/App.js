import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Analysis from './pages/Analysis';
import Auth from './pages/Auth';
import Devman from './pages/Devman';
import Navbar from './components/Navbar/Nav';
import Home from './pages/Home';
import Logout from './pages/Logout';
import Oauth from './pages/Oauth';
import Test from './pages/Test';


import AuthContext from './context/auth-context';

const InitialState = {
  userId:null,
  token:null,
  tokenExpiration:null,
  userName:'guest'
}

class App extends Component {
  constructor(props){
    super(props);
    this.state =localStorage.getItem("appState")? JSON.parse(localStorage.getItem("appState")):InitialState;

  }
  login=(userId, token, tokenExpiration,userName)=>{
    this.setState({userId: userId,token:token, tokenExpiration:tokenExpiration,userName:userName});
    localStorage.setItem('appState',JSON.stringify(this.state))
  }
  logout =()=>{
    this.setState({userId:null,token:null, tokenExpiration:null, userName:'guest'});
    localStorage.removeItem('appState');
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        <AuthContext.Provider value={
          {
            tokenExpiration:this.state.tokenExpiration,
            token:this.state.token,
            userId:this.state.userId,
            userName:this.state.userName,
            login:this.login,
            logout:this.logout
          }}>
          <Navbar/>
          <main style={{marginTop : "60px"}}>
            <Switch>
              {!this.state.token && <Redirect from="/devicemanager" to="/auth" exact/>}
              {!this.state.token && <Redirect from="/logout" to="/auth" exact/>}

              {this.state.token && <Redirect from="/auth/login" to="/home" exact/>}
              {this.state.token && <Redirect from="/oauth/code=:id" to="/home" exact/>}

              <Redirect from="/" to="/home" exact/>
              <Route exact path="/home" component ={Home}/>
              <Route path="/auth" component ={Auth}/>
              <Route path="/logout" component ={Logout}/>
              <Route path="/analysis" component ={Analysis}/>
              <Route path="/devicemanager" component ={Devman}/>
              <Route path="/oauth" component ={Oauth} exact/>
              <Route path="/oauth/code=:id" component ={Test}/>
            </Switch>
          </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
