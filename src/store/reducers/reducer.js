const initialState = {
    fetchedRepos:[]
};

const reducer = (state=initialState, action) => {
    const newState = {...state};

    switch(action.type){

        case 'FETCH_REPOS':
            newState.fetchedRepos = action.value;
            break;
        default:
            return newState;

}
    return newState;
};

export default reducer;