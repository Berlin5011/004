import React from 'react';
import AuthContext from '../context/auth-context';
import './Form.css'
const Home = props=>(
  <AuthContext.Consumer>
  {(context)=>{
    return(
      <div className="form-control">
        <h1>Welcome {context.userName}</h1>
      </div>
    )
  }}
  </AuthContext.Consumer>
)
export default Home;
