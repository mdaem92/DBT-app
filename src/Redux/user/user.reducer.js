import UserActionTypes from './user.types'

const defaultUserReducer = {
    currentUser:undefined,
    loading:false,
    errorMessage:undefined,
    teammates:[]
}

export const UserReducer = (state=defaultUserReducer,action)=>{
    switch (action.type) {
        case UserActionTypes.SIGN_IN_START:
        case UserActionTypes.SIGN_OUT_START:
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
            return defaultUserReducer
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                errorMessage:action.errorMessage
            }
        
        
        default:
            return state;
    }
}

export default UserReducer