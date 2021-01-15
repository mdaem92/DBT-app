import {JournalsActionTypes} from './journals.types'
import {editJournal,removeJournal} from './journals.utils'

const journalsReducer = (state=[],action)=>{
    switch (action.type) {
        case JournalsActionTypes.ADD_JOURNAL:
            return[
                ...state,
                action.newJournal  
            ]
        case JournalsActionTypes.EDIT_JOURNAL:
            return editJournal(state,action.index,action.updates)

        case JournalsActionTypes.REMOVE_JOURNAL:
            return removeJournal(state,action.index)

        default:
            return state;
    }
}
export default journalsReducer