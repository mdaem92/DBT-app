const defaultState = {
    showGraph:true
}

const friendsOverviewReducer = (state=defaultState,action)=>{
    switch (action.type) {
        case 'TOGGLE_VIEW':
            return{
                ...state,
                showGraph:!state.showGraph
            }    
        default:
            return state;
    }
}

export default friendsOverviewReducer