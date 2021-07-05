import UserActionTypes from './user.types'
import { removeTeammate } from './user.utils'

const defaultUserState = {
    currentUser:undefined,
    loading:false,
    errorMessage:undefined,
    teammates:[],
    isTeammatesFetched:false
}

export const UserReducer = (state=defaultUserState,action)=>{
    switch (action.type) {
        case UserActionTypes.SIGN_IN_START:
        case UserActionTypes.SIGN_OUT_START:
        case UserActionTypes.ADD_TEAMMATE_START:
        case UserActionTypes.REMOVE_TEAMMATE_START:
        case UserActionTypes.FETCH_TEAMMATES_START:
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
            return {
                ...state,
                errorMessage:action.errorMessage,
                loading:false
            }
        case UserActionTypes.ADD_TEAMMATE_SUCCESS:
            return{
                ...state,
                loading:false,
                teammates:[...state.teammates,{...action.teammate}],
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

        default:
            return state;
    }
}

export default UserReducer