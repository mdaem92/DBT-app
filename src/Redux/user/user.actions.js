import UserActionTypes from './user.types'

export const signInStart = ()=>({
    type:UserActionTypes.SIGN_IN_START
})

export const signInSuccess = (user)=>({
    type:UserActionTypes.SIGN_IN_SUCCESS,
    user
})

export const signInFailure = (errorMessage)=>({
    type:UserActionTypes.SIGN_IN_FAILURE,
    errorMessage
})

export const signOutStart = ()=>({
    type:UserActionTypes.SIGN_OUT_START
})

export const signOutSuccess = ()=>({
    type:UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (errorMessage)=>({
    type:UserActionTypes.SIGN_OUT_FAILURE,
    errorMessage
})

export const addTeammateStart = (uid,teammate)=>({
    type:UserActionTypes.ADD_TEAMMATE_START,
    uid,
    teammate
    
})

export const addTeammateSuccess = (teammate=undefined)=>({
    type:UserActionTypes.ADD_TEAMMATE_SUCCESS,
    teammate
})

export const addTeammateFailure = (errorMessage)=>({
    type:UserActionTypes.ADD_TEAMMATE_FAILURE,
    errorMessage
})
export const removeTeammateStart = ()=>({
    type:UserActionTypes.REMOVE_TEAMMATE_START
})

export const removeTeammateSuccess = (id)=>({
    type:UserActionTypes.REMOVE_TEAMMATE_SUCCESS,
    id
})

export const removeTeammateFailure = (errorMessage)=>({
    type:UserActionTypes.REMOVE_TEAMMATE_FAILURE,
    errorMessage
})

export const fetchTeammatesStart = ()=>({
    type:UserActionTypes.FETCH_TEAMMATES_START
})

export const fetchTeammatesSuccess = (teammates)=>({
    type:UserActionTypes.FETCH_TEAMMATES_SUCCESS,
    teammates
})
export const fetchTeammatesFailure = (errorMessage)=>({
    type:UserActionTypes.FETCH_TEAMMATES_FAILURE,
    errorMessage
})

export const setDeadlineStart= (deadlineType,value)=>({
    type:UserActionTypes.SET_DEADLINE_START,
    deadlineType,
    value
})

export const setDeadlineSuccess = (deadlineType,value)=>({
    type:UserActionTypes.SET_DEADLINE_SUCCESS,
    deadlineType,
    value
})

export const setDeadlineFailure = (errorMessage)=>({
    type:UserActionTypes.SET_DEADLINE_FAILURE,
    errorMessage
})

export const fetchDeadlineStart = ()=>({
    type:UserActionTypes.FETCH_DEADLINE_START
})

export const fetchDeadlineSuccess = (deadlineData)=>({
    type:UserActionTypes.FETCH_DEADLINE_SUCCESS,
    deadlineData
})

export const fetchDeadlineFailure = (errorMessage)=>({
    type:UserActionTypes.FETCH_DEADLINE_FAILURE,
    errorMessage
})

export const fetchTagsStart = ()=>({
    type:UserActionTypes.FETCH_TAGS_START
})
export const fetchTagsSuccess = (tags)=>({
    type:UserActionTypes.FETCH_TAGS_SUCCESS,
    tags
})
export const fetchTagsFailure = (errorMessage)=>({
    type:UserActionTypes.FETCH_TAGS_FAILURE,
    errorMessage
})

export const addTagStart=(newTag)=>({
    type:UserActionTypes.ADD_TAG_START,
    newTag
})

export const addTagSuccess = (newTag)=>({
    type:UserActionTypes.ADD_TAG_SUCCESS,
    newTag
})
export const addTagFailure = (errorMessage)=>({
    type:UserActionTypes.ADD_TAG_FAILURE,
    errorMessage
})

export const removeTagStart = (tag)=>({
    type:UserActionTypes.REMOVE_TAG_START,
    tag
})

export const removeTagSuccess = (tag)=>({
    type:UserActionTypes.REMOVE_TAG_SUCCESS,
    tag
})

export const removeTagFailure = (errorMessage)=>({
    type:UserActionTypes.REMOVE_TAG_FAILURE,
    errorMessage
})



