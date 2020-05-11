const initialState = {
    fetchedRepos:[],
    filtered_repos:[],
    sorting_state: ""
};

const reducer = (state=initialState, action) => {
    const newState = {...state};

    switch(action.type){

        case 'FETCH_REPOS':
            newState.fetchedRepos = action.value;
            newState.filtered_repos = [...newState.fetchedRepos]
            break;
        case 'FILTER_REPOS':
            if(action.value === ""){
                newState.filtered_repos = [...newState.fetchedRepos];
            }
            newState.filtered_repos = newState.filtered_repos.filter(i=>{
              return i.id.toString().includes(action.value) || i.name.includes(action.value);
            });
            break;
        case 'SORT_STAR_GAZERS':
            var list = newState.filtered_repos;
            if(newState.sorting_state === "" || newState.sorting_state === "DESC"){
                list.sort((a, b) => parseFloat(a.stargazers_count) - parseFloat(b.stargazers_count));
                newState.sorting_state = "ASC"
            }else{
                list.sort((a, b) => parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count));
                newState.sorting_state = "DESC"
            }
            newState.filtered_repos  = list;
            break;
        default:
            return newState;

}
    return newState;
};

export default reducer;