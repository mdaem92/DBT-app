import {FormActionTypes}from './form.types'

const formDefaultState = {
    date:undefined,
    goalDescription:'',
    isMorningReport:true,
    mood:undefined,
    tension:undefined,
    selfEsteemReport:'',
    additionalNotes:''
}

const formReducer =  (state=formDefaultState,action)=>{
    switch (action.type) {
        case FormActionTypes.SET_FIELD_VALUE:
            return {
                ...state,
                [action.name]:action.value
            }
        case FormActionTypes.RESET_FORM:
            return formDefaultState
        default:
            return state;
    }
}
export default formReducer