import NotificationsActionTypes from './notifications.types'
import { deleteNotification } from './notifications.utils'


const NotificationsDefaultState = {
    notifications:[],
    isLoading:false,
    error:undefined,
    fetchError:undefined,
    isRequestPending:false,
    isNotificationsFetched:false,
    isNotificationSubmitted:false,
}

const notificationsReducer = (state=NotificationsDefaultState,action)=>{
    switch (action.type) {
        case NotificationsActionTypes.FETCH_NOTIFICATION_START:
            return{
                ...state,
                isLoading:true
            }
        case NotificationsActionTypes.FETCH_NOTIFICATION_SUCCESS:
            return{
                ...state,
                isLoading:false,
                notifications:action.notifications,
                isNotificationsFetched:true,
                error:undefined,
            }
        case NotificationsActionTypes.FETCH_NOTIFICATION_FAILURE:
        case NotificationsActionTypes.SEND_REQUEST_FAILURE:
            return{
                ...state,
                isLoading:false,
                error:action.error
            }
        case NotificationsActionTypes.SEND_REQUEST_START:
            return{
                ...state,
                isRequestPending:true,
                isLoading:true
            }
        case NotificationsActionTypes.SEND_REQUEST_SUCCESS:
            return{
                ...state,
                isRequestPending:false,
                error:undefined,
                isLoading:false,
                
            }
        case NotificationsActionTypes.RESET_ERROR:
            return{
                ...state,
                error:undefined
            }
        case NotificationsActionTypes.SET_CURRENT_NOTIFICATIONS:
            return{
                ...state,
                notifications:action.notifications,
            }
        case NotificationsActionTypes.REMOVE_NOTIFICATION_SUCCESS:
            return{
                ...state,
                notifications:deleteNotification(state.notifications,action.notifID)
            }
        default:
            return state;
    }
}

export default notificationsReducer