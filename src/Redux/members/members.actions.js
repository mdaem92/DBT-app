import MembersActionTypes from './members.types'

export const fetchMembersStart = ()=>({
    type:MembersActionTypes.FETCH_MEMBERS_START
})

export const fetchMembersSuccess = (members)=>({
    type:MembersActionTypes.FETCH_MEMBERS_SUCCESS,
    members
})

export const fetchMembersFailure = (errorMessage)=>({
    type:MembersActionTypes.FETCH_MEMBERS_FAILURE,
    errorMessage
})