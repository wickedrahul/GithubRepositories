import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/action";

import Repo from "./components/repo";

import { filterAnArrayOfObjects, sortAnArrayBasedOnAPropertyValue } from "./utilities/utility";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedRepos: [],
      filtered_repos: [],
      sorting_state: '',
      fetching: true
    };
  }
  componentDidUpdate(prevProps){
    if (prevProps!== this.props) {
      const sortedFetchdedRepos =  sortAnArrayBasedOnAPropertyValue(this.props.fetchedRepos,"stargazers_count", "ASC");
      this.setState((state, props) => {
        return {
          fetchedRepos: sortedFetchdedRepos,
          filtered_repos: [...sortedFetchdedRepos],
          fetching: false,
          sorting_state: "ASC"
        };
      });
    }
  }
  componentDidMount(prevProps){
    this.props.getRepos();
  }

  handleSearch(event){
    const searchTerm = event.target.value;
    if(searchTerm=== ""){
      this.setState({
        filtered_repos: sortAnArrayBasedOnAPropertyValue( [...this.state.fetchedRepos],"stargazers_count", this.state.sorting_state)
      })
    }else{
      let filtered_repos = filterAnArrayOfObjects(searchTerm, this.state.fetchedRepos);
      filtered_repos = sortAnArrayBasedOnAPropertyValue(filtered_repos,"stargazers_count", this.state.sorting_state); 
      this.setState({
        filtered_repos: filtered_repos
      })
    }
  }

  sortStarGazers(){
    var list = [...this.state.filtered_repos];
    if(this.state.sorting_state === "" || this.state.sorting_state === "DESC"){
      list = sortAnArrayBasedOnAPropertyValue(list,"stargazers_count", "ASC");  
      this.setState({
          sorting_state: "ASC"
        })
    }else{
      list = sortAnArrayBasedOnAPropertyValue(list,"stargazers_count", "DESC");  
      this.setState({
          sorting_state: "DESC"
        })
    }
    this.setState({
      filtered_repos: list
    })

  }
  render() {
    console.log(this.state);
    var fetchedReposResults = [];
    if(this.state.filtered_repos && this.state.filtered_repos.length>0){
      fetchedReposResults= this.state.filtered_repos
    }

    return (
      <div className="App">
        <div>
          <input type="text" className="inputSearch" onChange={this.handleSearch.bind(this)}
          placeholder="search by Repository Id, name"/>
       </div>
       <div>
          <div className= "divStyle1" >Repositories</div>
          <div className= "divStyle1 divStyle2" onClick = {this.sortStarGazers.bind(this)}>Stars ({this.state.sorting_state})</div>
       </div>
      {
        this.state.fetching ? "Fetching..." : fetchedReposResults.map((f, index)=>{
          return <Repo key={f.id} data={f}/>
        })
      }

      </div>
    );
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
