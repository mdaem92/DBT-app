import {combineReducers} from 'redux'
import formReducer from './form/form.reducer'
import journalsReducer from './journals/journals.reducer'
import UserReducer from './user/user.reducer'

export default combineReducers({
    journals:journalsReducer,
    form:formReducer,
    auth:UserReducer

})