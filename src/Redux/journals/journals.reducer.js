import { JournalsActionTypes } from './journals.types'
import { editJournal, removeJournal, submitAndMergeJournal } from './journals.utils'

const defaultState = {
    isJournalsFetched: false,
    journalsLoading:false,
    journals: [],
    entriesPerChart:7
}

const journalsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case JournalsActionTypes.SUBMIT_JOURNAL_SUCCESS:

            return {
                ...state,
                journals: submitAndMergeJournal(state.journals, action.journal)
            }

        case JournalsActionTypes.EDIT_JOURNAL:
            return editJournal(state, action.index, action.updates)

        case JournalsActionTypes.REMOVE_JOURNAL:
            return removeJournal(state, action.index)
        case JournalsActionTypes.FETCH_JOURNALS_START:
            return{
                ...state,
                journalsLoading:true
            }
        case JournalsActionTypes.FETCH_JOURNALS_SUCCESS:
            return{
                ...state,
                journals:action.journals,
                journalsLoading:false,
                isJournalsFetched:true
            }
        case JournalsActionTypes.SET_FIELD_VALUE:
            return{
                ...state,
                [action.name]:action.value
            }

        default:
            return state;
    }
}
export default journalsReducer