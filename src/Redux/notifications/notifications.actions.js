import NotificationsActionTypes from "./notifications.types"

export const sendRequestStart = (sender,receiverId)=>({
    type:NotificationsActionTypes.SEND_REQUEST_START,
    receiverId,
    sender
})

export const sendRequestFailure = (error)=>({
    type:NotificationsActionTypes.SEND_REQUEST_FAILURE,
    error
})

export const sendRequestSuccess = ()=>({
    type:NotificationsActionTypes.SEND_REQUEST_SUCCESS
})

export const fetchNotificationsStart = (uid)=>({
    type:NotificationsActionTypes.FETCH_NOTIFICATION_START,
    uid
})

export const fetchNotificationsSuccess = (notifications)=>({
    type:NotificationsActionTypes.FETCH_NOTIFICATION_SUCCESS,
    notifications
    
})

export const fetchNotificationsFailure = (error)=>({
    type:NotificationsActionTypes.FETCH_NOTIFICATION_FAILURE,
    error
})

export const resetError = ()=>({
    type:NotificationsActionTypes.RESET_ERROR
})

export const setCurrentNotifications = (notifications)=>({
    type:NotificationsActionTypes.SET_CURRENT_NOTIFICATIONS,
    notifications

})

export const removeNotificationStart=(uid,notifID)=>({
    type:NotificationsActionTypes.REMOVE_NOTIFICATION_START,
    uid,
    notifID
})

export const removeNotificationsSuccess = (notifID)=>({
    type:NotificationsActionTypes.REMOVE_NOTIFICATION_SUCCESS,
    notifID
})

export const removeNotificationsFailure = (error)=>({
    type:NotificationsActionTypes.REMOVE_NOTIFICATION_FAILURE,
    error
})

