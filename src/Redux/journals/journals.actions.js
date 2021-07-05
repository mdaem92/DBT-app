import {JournalsActionTypes} from './journals.types'


export const submitJournalStart = (journal)=>({
    type:JournalsActionTypes.SUBMIT_JOURNAL_START,
    journal
})

export const submitJournalSuccess = (journal)=>({
    type:JournalsActionTypes.SUBMIT_JOURNAL_SUCCESS,
    journal
})

export const fetchJournalsStart = (uid)=>({
    type:JournalsActionTypes.FETCH_JOURNALS_START,
    uid
})

export const fetchJournalsSuccess = (journals)=>({
    type:JournalsActionTypes.FETCH_JOURNALS_SUCCESS,
    journals
})

export const fetchJournalsFailure = ()=>({
    type:JournalsActionTypes.FETCH_JOURNALS_FAILURE
})

export const setFieldValue = (name,value)=>({
    type:JournalsActionTypes.SET_DATE_FILTER_FIELD_VALUE,
    name,
    value
})
