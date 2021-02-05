import {createSelector} from 'reselect'

export const journalsSelector = ({journals:{journals}})=>journals
export const isJournalsFetchedSelector = ({journals:{isJournalsFetched}})=>isJournalsFetched

export const moodsSelector = createSelector(
    journalsSelector,
    (journals)=>{
        return journals.reduce((acc,{date,mood,mood2})=>{
            return [...acc,{date,mood,mood2}]
        },[])
    }
)
export const tensionsSelector = createSelector(
    journalsSelector,
    (journals)=>{
        return journals.reduce((acc,{date,tension,tension2})=>{
            return [...acc,{date,tension,tension2}]
        },[])
    }
)