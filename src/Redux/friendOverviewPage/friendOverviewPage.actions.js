export const toggleView = ()=>({
    type:'TOGGLE_VIEW'
})

export const setFriendDataFieldValue = (field,value)=>({
    type:'FRIEND_DATA_SET_FIELD_VALUE',
    field,
    value
})