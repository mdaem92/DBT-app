import UserActionTypes from './user.types'
import { removeTag, removeTeammate  } from './user.utils'

const defaultUserState = {
    currentUser:undefined,
    loading:false,
    errorMessage:undefined,
    teammates:[],
    isTeammatesFetched:false,
    morningDeadline:undefined,
    eveningDeadline:undefined,
    tags:[]
}

export const UserReducer = (state=defaultUserState,action)=>{
    switch (action.type) {
        case UserActionTypes.SIGN_IN_START:
        case UserActionTypes.SIGN_OUT_START:
        case UserActionTypes.ADD_TEAMMATE_START:
        case UserActionTypes.REMOVE_TEAMMATE_START:
        case UserActionTypes.FETCH_TEAMMATES_START:
        case UserActionTypes.SET_DEADLINE_START:
        case UserActionTypes.FETCH_DEADLINE_START:
        case UserActionTypes.FETCH_TAGS_START:
        case UserActionTypes.ADD_TAG_START:
        case UserActionTypes.REMOVE_TAG_START:
            return {
                ...state,
                loading:true
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                currentUser:action.user,
                loading:false,
                errorMessage:undefined
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return defaultUserState
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.ADD_TEAMMATE_FAILURE:
        case UserActionTypes.FETCH_TEAMMATES_FAILURE:
        case UserActionTypes.SET_DEADLINE_FAILURE:
        case UserActionTypes.FETCH_DEADLINE_FAILURE:
        case UserActionTypes.FETCH_TAGS_FAILURE:
        case UserActionTypes.ADD_TAG_FAILURE:
        case UserActionTypes.REMOVE_TAG_FAILURE:
            return {
                ...state,
                errorMessage:action.errorMessage,
                loading:false
            }
        case UserActionTypes.ADD_TEAMMATE_SUCCESS:
            console.log('got teammate ',action.teammate);
            return{
                ...state,
                loading:false,
                // teammates:[...state.teammates,action.teammate],
                // teammates:addTeammate(state.teammates,action.teammate),
                teammates:!!action.teammate?[...state.teammates,{...action.teammate}]:state.teammates,
                errorMessage:undefined
            }
        case UserActionTypes.REMOVE_TEAMMATE_SUCCESS:
            return {
                ...state,
                loading:false,
                teammates:removeTeammate(state.teammates,action.id),
                errorMessage:undefined

            }
        case UserActionTypes.FETCH_TEAMMATES_SUCCESS:
            return{
                ...state,
                loading:false,
                teammates:action.teammates,
                isTeammatesFetched:true,
                errorMessage:undefined

            }
        case UserActionTypes.SET_DEADLINE_SUCCESS:
            return{
                ...state,
                loading:false,
                errorMessage:undefined,
                [action.deadlineType]:action.value
            }
        case UserActionTypes.FETCH_DEADLINE_SUCCESS:
            return{
                ...state,
                loading:false,
                errorMessage:undefined,
                morningDeadline:action.deadlineData.morningDeadline,
                eveningDeadline:action.deadlineData.eveningDeadline
            }
        case UserActionTypes.FETCH_TAGS_SUCCESS:
            return{
                ...state,
                loading:false,
                errorMessage:undefined,
                tags:action.tags
            }
        case UserActionTypes.ADD_TAG_SUCCESS:
            return{
                ...state,
                loading:false,
                errorMessage:undefined,
                tags:[...state.tags,action.newTag]
            }
        case UserActionTypes.REMOVE_TAG_SUCCESS:
            return{
                ...state,
                loading:false,
                errorMessage:undefined,
                tags:removeTag(state.tags,action.tag)
            }

        default:
            return state;
    }
}

export default UserReducer