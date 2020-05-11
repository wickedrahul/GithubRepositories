import React, { Component } from "react";

class Repo extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state={
      showDetails:false
    }
  }


  render() {
    const divStyle1 ={
      'display': 'inline-block',
      'border': '1px solid black',
      'width': '48%',
      'verticalAlign': 'top'
    }

    const divStyle2 ={
      'display': 'inline-block',
      'border': '1px solid black',
      'width': '48%',
      'verticalAlign': 'top',
      'padding': '0 0 36px'
    }
    const data = this.props.data;
    return (
    <div key = {data.id}>
      <div  style={divStyle1}>
        <span>ID: </span> {data.id}<br/>
        <span>Name: </span> {data.name}<br/>
        <span>Watchers: </span> {data.watchers}<br/>
        
      </div>
      <div style = {divStyle2}>
        <span>Stars: </span> {data.stargazers_count}<br/>
      </div>
    </div>
    )



  }
}

export default Repo
