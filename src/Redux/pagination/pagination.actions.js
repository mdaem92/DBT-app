import PaginationActionTypes from './pagination.types'

export const setCurrentPage = (fieldName,currentPage)=>({
    type:PaginationActionTypes.SET_CURRENT_PAGE,
    fieldName,
    currentPage

})

export const setPageCount = (fieldName,pageCount)=>({
    type:PaginationActionTypes.SET_PAGE_COUNT,
    fieldName,
    pageCount
})