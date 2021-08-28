import {createSelector} from 'reselect'

const authSelector =({auth})=> auth


export const currentUserSelector = createSelector(
    authSelector,
    ({currentUser})=>currentUser
)

export const teammatesSelector = createSelector(
    authSelector,
    ({teammates})=>teammates
)

export const isTeammatesFetchedSelector = createSelector(
    authSelector,
    ({isTeammatesFetched})=>isTeammatesFetched
)

export const isFriendshipConfirmedSelector = createSelector(
    teammatesSelector,
    (_,friendID)=>friendID,
    (teammates,friendID)=>teammates.findIndex(teammate=>teammate.id===friendID)>=0
)

export const deadlineDataSelector = createSelector(
    authSelector,
    ({morningDeadline,eveningDeadline})=>({morningDeadline,eveningDeadline})
)

export const tagsSelector = createSelector(
    authSelector,
    ({tags})=>tags

)