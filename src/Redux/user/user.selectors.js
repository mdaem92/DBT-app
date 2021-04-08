import {createSelector} from 'reselect'

const authSelector =({auth})=> auth

export const currentUserSelector = createSelector(
    authSelector,
    ({currentUser})=>currentUser
)