import React, { Component } from 'react';
import './Form.css';

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
      <li key={this.props.name}>
        <header onClick={this.toggleArrow} className="headers_content">
        {this.props.value}{this.props.name}
        <div className="spacer"></div>
        <button><i className={`${this.state.toggleClick ? 'down':'up'}`}></i></button>
        </header>
        {
          !this.state.toggleClick &&
          <div className="content">
            <ul>
              <li>
                <label>aaaa</label>
                <input placeholder="abc"/>
              </li>
              <li>
                <label>bbbbb</label>
                <input placeholder="abc"/>
              </li>
            </ul>
          </div>
        }
      </li>
    )
  }
}

class Analysis extends Component{
  constructor(props){
    super(props)
    this.state={
      response:['a','b','c','d'],
    };
  }

  render(){
    return(
      <div className="result">
        <div className="form-control">
          <h1>Testing Site </h1>
        </div>
        <ul>
          {this.state.response.map((a,index)=>{
            return(<Device value={a} name={index}/>)
          })}
        </ul>
      </div>
    )
  }
}

export default Analysis;
