import UserActionTypes from './user.types'
import { removeTeammate } from './user.utils'

const defaultUserState = {
    currentUser:undefined,
    loading:false,
    errorMessage:undefined,
    teammates:[]
}

export const UserReducer = (state=defaultUserState,action)=>{
    switch (action.type) {
        case UserActionTypes.SIGN_IN_START:
        case UserActionTypes.SIGN_OUT_START:
        case UserActionTypes.ADD_TEAMMATE_START:
        case UserActionTypes.REMOVE_TEAMMATE_START:
            return {
                ...state,
                loading:true
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                currentUser:action.user,
                loading:false,
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return defaultUserState
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.ADD_TEAMMATE_FAILURE:
            return {
                ...state,
                errorMessage:action.errorMessage,
                loading:false
            }
        case UserActionTypes.ADD_TEAMMATE_SUCCESS:
            return{
                ...state,
                loading:false,
                teammates:action.teammates
            }
        case UserActionTypes.REMOVE_TEAMMATE_SUCCESS:
            return {
                ...state,
                loading:false,
                teammates:removeTeammate(state.teammates,action.id)
            }

        default:
            return state;
    }
}

export default UserReducer