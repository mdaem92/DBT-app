import {createSelector} from 'reselect'

export const journalsArraySelector = ({journals:{journals}})=>journals
export const isJournalsFetchedSelector = ({journals:{isJournalsFetched}})=>isJournalsFetched
const journalsSelector = ({journals})=>journals

export const moodsSelector = createSelector(
    journalsArraySelector,
    (journals)=>{
        return journals.reduce((acc,{date,mood,mood2})=>{
            return [...acc,{date,mood,mood2}]
        },[])
    }
)
export const tensionsSelector = createSelector(
    journalsArraySelector,
    (journals)=>{
        return journals.reduce((acc,{date,tension,tension2})=>{
            return [...acc,{date,tension,tension2}]
        },[])
    }
)

export const entriesPerChartSelector = createSelector(
    journalsSelector,
    ({entriesPerChart})=>entriesPerChart
)

export const paginatedMoodsSelector = createSelector(
    moodsSelector,
    entriesPerChartSelector,
    (journals,entriesPerChart)=>journals.slice(0,entriesPerChart)
)
export const paginatedTensionsSelector = createSelector(
    tensionsSelector,
    entriesPerChartSelector,
    (journals,entriesPerChart)=>journals.slice(0,entriesPerChart)
)