const defaultState = {
    showGraph:true,
    dateFrom:undefined,
    dateTo:undefined
}

const friendsOverviewReducer = (state=defaultState,action)=>{
    switch (action.type) {
        case 'TOGGLE_VIEW':
            return{
                ...state,
                showGraph:!state.showGraph
            }
        case 'FRIEND_DATA_SET_FIELD_VALUE':
            return{
                ...state,
                [action.field]:action.value
            }    
        default:
            return state;
    }
}

export default friendsOverviewReducer