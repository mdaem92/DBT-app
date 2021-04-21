import MembersActionTypes from './members.types'

const membersDefaultState = {
    loading:false,
    members:[],
    error:"",
    isMembersFetched:false
}
const membersReducer = (state=membersDefaultState,action)=>{
    switch (action.type) {
        case MembersActionTypes.FETCH_MEMBERS_START :
            return{
                ...state,
                loading:true
            }
        case MembersActionTypes.FETCH_MEMBERS_SUCCESS:
            return{
                ...state,
                loading:false,
                members:action.members,
                isMembersFetched:true
            }
        case MembersActionTypes.FETCH_MEMBERS_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.error
            }
            
        default:
            return state;
    }
}
export default membersReducer