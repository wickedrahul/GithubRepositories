import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/action";

import Repositories from "./components/repositories";

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(prevProps){
    this.props.getRepos();
  }

  render() {
    return(<Repositories fetchdedRepos={this.props.fetchedRepos}/>)
  }
}

const mapStateToProps = state => {
  
  return {
    fetchedRepos: state.fetchedRepos
  };
};

const mapDispachToProps = (dispatch, props) => {
  return {
    getRepos: (val) => dispatch(actionCreators.getRepos(val)),
  };
};
export default connect(
  mapStateToProps,
  mapDispachToProps
)(App);
