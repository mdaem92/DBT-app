import {combineReducers} from 'redux'
import formReducer from './form/form.reducer'
import journalsReducer from './journals/journals.reducer'
import membersReducer from './members/members.reducer'
import notificationsReducer from './notifications/notifications.reducer'
import UserReducer from './user/user.reducer'
import friendsOverviewPageReducer from './friendOverviewPage/friendOverviewPage.reducer'
import paginationReducer from './pagination/pagination.reducer'

export default combineReducers({
    journals:journalsReducer,
    form:formReducer,
    auth:UserReducer,
    members:membersReducer,
    notification:notificationsReducer,
    friendsOverviewPage:friendsOverviewPageReducer,
    pagination:paginationReducer

})