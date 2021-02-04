import {JournalsActionTypes} from './journals.types'


export const submitJournalStart = (journal)=>({
    type:JournalsActionTypes.SUBMIT_JOURNAL_START,
    journal
})

export const submitJournalSuccess = (journal)=>({
    type:JournalsActionTypes.SUBMIT_JOURNAL_SUCCESS,
    journal
})