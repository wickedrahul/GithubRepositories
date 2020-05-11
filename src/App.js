import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/action";

import Repo from "./components/repo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      fetchedRepos: [],
      filtered_repos: [],
      sorting_state: '',
      fetching: true
    };
  }
  componentDidUpdate(prevProps){
    if (prevProps!== this.props) {
      const fetchdedRepos = this.props.fetchedRepos;
      fetchdedRepos.sort((a, b) => parseFloat(a.stargazers_count) - parseFloat(b.stargazers_count));
      this.setState((state, props) => {
        return {
          fetchedRepos: fetchdedRepos,
          filtered_repos: [...fetchdedRepos],
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
        filtered_repos: [...this.state.fetchedRepos]
      })
    }else{
      let filtered_repos = this.state.fetchedRepos.filter(i=>{
        return i.id.toString().includes(searchTerm) || i.name.includes(searchTerm);
      });

      this.setState({
        filtered_repos: filtered_repos
      })
    }
  }

  sortStarGazers(){
    var list = [...this.state.filtered_repos];
    if(this.state.sorting_state === "" || this.state.sorting_state === "DESC"){
        list.sort((a, b) => parseFloat(a.stargazers_count) - parseFloat(b.stargazers_count));
        this.setState({
          sorting_state: "ASC"
        })
    }else{
        list.sort((a, b) => parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count));
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
