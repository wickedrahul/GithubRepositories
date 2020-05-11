import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/action";

import Repo from "./components/repo";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {searchString: ''};
  }
  componentDidMount(prevProps){
    this.props.getRepos();
  }

  handleSearch(event){
    //handle search
    const searchTerm = event.target.value;
    this.setState({
      searchString: searchTerm
    });
    this.props.filterRepos(searchTerm);
    // this.props.fetchedRepos.filter(i=>{
    //   return i.id.toString().includes(searchTerm) || i.name.includes(searchTerm);
    // })
  }

  sortStarGazers(){

  }
  render() {
    var fetchedReposResults = [];
    if(this.props.filtered_repos && this.props.filtered_repos.length>0){
      fetchedReposResults= this.props.filtered_repos
    }
    const divStyle1 ={
      'display': 'inline-block',
      'border': '1px solid black',
      'width': '48%',
      'verticalAlign': 'top',
      'padding': '0 0 36px',
      'textAlign': 'center'
    }

    const divStyle2 ={
      'display': 'inline-block',
      'border': '1px solid black',
      'width': '48%',
      'verticalAlign': 'top',
      'padding': '0 0 36px',
      'textAlign': 'center',
      'cursor': 'pointer'
    }

    return (
      <div className="App">
        <div>
          <input type="text" className="inputSearch" onChange={this.handleSearch.bind(this)}
          placeholder="search by title, author"/>
       </div>
       <div>
          <div style= {divStyle1} >Repositories</div>
          <div style= {divStyle2} onClick = {this.props.sortStarGazers.bind(this)}>Stars ({this.props.sorting_state})</div>
         
       </div>
      {
        fetchedReposResults.map((f, index)=>{
          return <Repo key={f.id} data={f}/>
        })
      }
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetchedRepos: state.fetchedRepos,
    filtered_repos: state.filtered_repos,
    sorting_state: state.sorting_state
  };
};

const mapDispachToProps = (dispatch, props) => {
  return {
    getRepos: (val) => dispatch(actionCreators.getRepos(val)),
    filterRepos: (val) => dispatch(actionCreators.filterRepos(val)),
    sortStarGazers: (val) => dispatch(actionCreators.sortStarGazers(val)),
  };
};
export default connect(
  mapStateToProps,
  mapDispachToProps
)(App);
