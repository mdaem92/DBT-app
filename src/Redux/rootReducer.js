import {combineReducers} from 'redux'
import formReducer from './form/form.reducer'
import journalsReducer from './journals/journals.reducer'

export default combineReducers({
    journals:journalsReducer,
    form:formReducer
})