import {JournalsActionTypes} from './journals.types'


export const submitJournal = (journal)=>({
    type:JournalsActionTypes.SUBMIT_JOURNAL,
    journal
})