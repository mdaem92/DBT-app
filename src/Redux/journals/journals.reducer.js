import {JournalsActionTypes} from './journals.types'
import {editJournal,removeJournal} from './journals.utils'

const journalsDefaultState = [
    {
        name: 'Mon', mood: 0, tension: 50, mood2: 1, tension2: 40
    },
    {
        name: 'Tue', mood: 1, tension: 30, mood2: 0, tension2: 40
    },
    {
        name: 'Wed', mood: 0, tension: 55, mood2: 0, tension2: 30
    },
    {
        name: 'Thu', mood: 1, tension: 35, mood2: -1, tension2: 55
    },
    {
        name: 'Fri', mood: -1, tension: 60, mood2: 0, tension2: 40
    },
    {
        name: 'Sat', mood: 0, tension: 30, mood2: -2, tension2: 55
    },
    {
        name: 'Sun', mood: 0, tension: 35, mood2: -1, tension2: 30
    },
]

const journalsReducer = (state=journalsDefaultState,action)=>{
    switch (action.type) {
        case JournalsActionTypes.SUBMIT_JOURNAL:
            return[
                ...state,
                action.journal 
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