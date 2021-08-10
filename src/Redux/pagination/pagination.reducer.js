import PaginationActionTypes from './pagination.types'

const defaultState = {
    ownCurrentPage:1,
    friendCurrentPage:1,
    ownPageCount:10,
    friendPageCount:10,
}

const paginationReducer = (state=defaultState,action)=>{
    switch (action.type) {
        case PaginationActionTypes.SET_CURRENT_PAGE:
            return{
                ...state,
                [action.fieldName]:action.currentPage
            }  
        case PaginationActionTypes.SET_PAGE_COUNT:
            return{
                ...state,
                [action.fieldName]:action.pageCount
            }
        
    
        default:
            return state;
    }
}

export default paginationReducer