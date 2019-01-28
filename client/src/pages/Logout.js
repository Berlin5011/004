import React,{Component} from 'react';
import AuthContext from '../context/auth-context';

class Logout extends Component {
  static contextType=AuthContext;
  logout=() =>{
    this.context.logout()
  }
  render(){
    return(
      <React.Fragment>
      {this.logout()}
      </React.Fragment>
    )
  }
}
export default Logout;
