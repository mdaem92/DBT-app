import {createSelector} from 'reselect'

const notifications = state=>state.notification

export const notificationLoadingSelector = createSelector(
    notifications,
    ({isLoading})=>isLoading
)

export const notifErrorSelector = createSelector(
    notifications,
    ({error})=>error
)
export const isNotificationsFetchedSelector = createSelector(
    notifications,
    ({isNotificationsFetched})=>isNotificationsFetched
)
export const notificationsSelector = createSelector(
    notifications,
    ({notifications})=>notifications
)