import React, { Component } from 'react';
import './Form.css';
import AuthContext from '../context/auth-context'

class Device extends Component{
  constructor(props){
    super(props)
    this.state={
      toggleClick:true
    }
    this.toggleArrow=this.toggleArrow.bind(this)
  }
  toggleArrow (){
    this.setState({toggleClick:!this.state.toggleClick})
  }
  render(){
    return(
      <li key={this.props.index}>
      <header>
        <h4>{this.props.title}</h4>
        <button onClick={this.toggleArrow}><i className={`${this.state.toggleClick ? 'down':'up'}`}></i></button>
      </header>
      <body>
      {
          !this.state.toggleClick &&
          <div className="content">
            <ul>
              <li>
                <label>Price:</label>
                <p>{this.props.price}</p>
              </li>
              <li>
                <label>Description:</label>
                <p>{this.props.description}</p>
              </li>
              <li>
                <label>Date created:</label>
                <p>{this.props.date}</p>
              </li>
              <li>
                <button>adffff</button>
              </li>
            </ul>
          </div>
        }
        </body>
      </li>
    )
  }
}

class Devman extends Component{
  constructor(props){
    super(props)
    this.state={
      event:null
    };
  }

  static contextType=AuthContext;

  toggleClicked(){
    this.setState({toggleClick:!this.state.toggleClick});
  }

  displayData (data){
    if (data!==null){
      if (data.length>0){
        return (data.map((item,index)=>{
          return(
            <Device title={item.title} price={item.price} description={item.description} date={item.date} index={item.index}/>
          )
        }));
      }else {
        return (<p>You have no devices</p>)
      }
    }
  }

  submitHandler = event =>{
    event.preventDefault();
    const requestBody = {
      query:
      `
      query{
        userinfo{
          createdEvents{
            title
            price
            description
            date
          }
        }
      }
      `
    };

    fetch('http://localhost:3002/graphql',{
      method:'POST',
      body: JSON.stringify(requestBody),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.context.token}`
      }
    })
    .then(res =>{
      if (res.status!==200 && res.status!==201){
        throw new Error('Failed')
      }
      return res.json();
    })
    .then(resData =>{
        this.setState({event:resData.data.userinfo.createdEvents})
      })
    .catch(err =>{
      console.log(err);
    });
  }

  render(){
    return(
      <form onSubmit={this.submitHandler}>
        <div className="form-control">
          <h1>Devman </h1>
        </div>
        <div className="form-actions">
          <button type="submit">Search</button>
        </div>
        <div className="result">
          <ul>
            {this.displayData(this.state.event)}
          </ul>
        </div>
      </form>
    )
  }
}

export default Devman;
