import { createSelector } from "reselect"

const paginationSelector = ({pagination})=>pagination

export const currentPageSelector = createSelector(
    paginationSelector,
    (_,fieldName)=>fieldName,
    (pagination,fieldName)=>{
        // console.log(`pagination: ${pagination}, fieldName: ${fieldName}`);
        // console.log('pagination from selector: ',pagination);
        if(fieldName==="ownCurrentPage"){
            return pagination.ownCurrentPage
        }
        return pagination.friendCurrentPage
    }
)

export const pageSizeSelector = createSelector(
    paginationSelector,
    (_,fieldName)=>fieldName,
    (pagination,fieldName)=>{
        // console.log('pagination from selector: ',pagination);
        if(fieldName==="ownPageSize"){
            return pagination.ownPageSize
        }
        return pagination.friendPageCount
    }
)
