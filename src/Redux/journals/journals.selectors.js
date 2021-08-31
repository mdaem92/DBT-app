import { createSelector } from 'reselect'
import moment from 'moment'
export const journalsArraySelector = ({ journals: { journals } }) => journals
export const isJournalsFetchedSelector = ({ journals: { isJournalsFetched } }) => isJournalsFetched
const paginationDataSelector = ({pagination})=>pagination

const journalsSelector = ({ journals }) => journals

export const moodsSelector = createSelector(
    journalsArraySelector,
    (journals) => {
        return journals.reduce((acc, { date, mood, mood2 }) => {
            return [...acc, { date, mood, mood2 }]
        }, [])
    }
)
export const tensionsSelector = createSelector(
    journalsArraySelector,
    (journals) => {
        return journals.reduce((acc, { date, tension, tension2 }) => {
            return [...acc, { date, tension, tension2 }]
        }, [])
    }
)
export const journalsFiltersSelector = createSelector(
    journalsSelector,
    ({dateFrom,dateTo})=>({dateFrom,dateTo})
)
export const entriesPerChartSelector = createSelector(
    journalsSelector,
    ({ entriesPerChart }) => entriesPerChart
)

export const paginatedMoodsSelector = createSelector(
    moodsSelector,
    entriesPerChartSelector,
    (journals, entriesPerChart) =>
        // journals.slice(entriesPerChart * -1)
        journals.slice(0,entriesPerChart > 0 ?entriesPerChart+1:journals.length)
        .sort((a, b) => moment(a.date) > moment(b.date) ? 1 : -1)
)
export const paginatedTensionsSelector = createSelector(
    tensionsSelector,
    entriesPerChartSelector,
    (journals, entriesPerChart) =>{
        console.log('journals from selector: ',journals);
        // return journals.slice(entriesPerChart * -1)
        return journals.slice(0,entriesPerChart > 0 ?entriesPerChart+1:journals.length)
        .sort((a, b) => moment(a.date) > moment(b.date) ? 1 : -1)
    }
)

export const entriesCountSelector = createSelector(
    journalsArraySelector,
    (journals) => journals.length
)

export const moodsSumSelector = createSelector(
    moodsSelector,
    (moods) => moods.reduce((acc, { mood, mood2 }) => {
        const a = !isNaN(mood) ? parseInt(mood) : 0
        const b = !isNaN(mood2) ? parseInt(mood2) : 0
        return acc += (a + b) / 2
    }, 0)

)

export const tensionsSumSelector = createSelector(
    tensionsSelector,
    (tensions) => tensions.reduce((acc, { tension, tension2 }) => {
        const a = !isNaN(tension) ? parseInt(tension) : 0
        const b = !isNaN(tension2) ? parseInt(tension2) : 0
        return acc += (a + b) / 2
    }, 0)
)

export const moodsAverageSelector = createSelector(
    entriesCountSelector,
    moodsSumSelector,
    (total, sum) => {
        // console.log(`total: ${total} sum: ${sum}`);
        // console.log(sum);
        return parseInt(sum / total)
    }
)
export const tensionsAverageSelector = createSelector(
    entriesCountSelector,
    tensionsSumSelector,
    (total, sum) => parseInt(sum / total)
)

export const submissionErrorSelector = createSelector(
    journalsSelector,
    ({errorMessage})=>errorMessage
)
export const sortedJournalsSelector = createSelector(
    journalsArraySelector,
    (journals)=>journals.sort((a, b) => moment(a.date) > moment(b.date) ? -1 : 1)
)

export const filteredSortedJournalsSelector = createSelector(
    sortedJournalsSelector,
    journalsFiltersSelector,
    (journals,{dateFrom,dateTo})=>journals.filter((journal)=>{
        //e.g. dateFrom 01,05,2021  journal date: 5.5,2021 dateto 23.05.21
        const matchFrom = dateFrom? moment(journal.date)>=moment(dateFrom):true
        const matchTo = dateTo? moment(journal.date)<=moment(dateTo):true
        return matchFrom && matchTo
    })
    
)

export const paginatedFilteredSortedJournalsSelector = createSelector(
    filteredSortedJournalsSelector,
    paginationDataSelector,
    (journals,{ownCurrentPage:currentPage,ownPageCount:pageSize})=>{

        const from = (currentPage-1)*pageSize
        const to = from +pageSize
        console.log('from: ',from," to: ",to);
        return journals.slice(from,to)
        
        
    }
    
)

export const journalsTotalCountSelector = createSelector(
    journalsArraySelector,
    (journals)=>journals.length
)
