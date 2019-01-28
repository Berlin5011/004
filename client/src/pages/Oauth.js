import React,{Component} from 'react';

class Oauth extends Component{
  state ={
    url:''
  }
  componentWillMount() {
      const HYDRA_ADMIN_URL = 'http://178.128.54.187:4455/v1/auth'
      const client_id = encodeURIComponent('idp-provider')
      const redirect_uri = encodeURIComponent('http://127.0.0.1:3002/callback')
      const scope = 'openid'
      const state = 'textState'
      const urlLogin = `${HYDRA_ADMIN_URL}?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`
      this.setState({
        url: urlLogin
      })
    }
    render() {
      return (
        <div>
          <a href={this.state.url}>Login with Việt An</a>
        </div>
      )
    }
}

export default Oauth;
