import React, { Component, Fragment } from "react";

class Repo extends Component {
  render() {
    const divStyle1 ={
      'display': 'inline-block',
      'border': '1px solid black',
      'width': '48%',
      'verticalAlign': 'top'
    }

    const divStyle2 ={
      'padding': '0 0 36px'
    }
    const data = this.props.data;
    return (
    <Fragment key = {data.id}>
      <div  style={divStyle1}>
        <span>ID: </span> {data.id}<br/>
        <span>Name: </span> {data.name}<br/>
        <span>Watchers: </span> {data.watchers}<br/>
      </div>
      <div style = {{...divStyle1, ...divStyle2}}>
        <span>Stars: </span> {data.stargazers_count}<br/>
      </div>
    </Fragment>
    )
  }
}

export default Repo
