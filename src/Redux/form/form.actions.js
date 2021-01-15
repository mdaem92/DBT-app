import {FormActionTypes} from './form.types'

export const setFieldValue = (name,value)=>({
    type:FormActionTypes.SET_FIELD_VALUE,
    name,
    value
})
export const resetForm = ()=>({
    type:FormActionTypes.RESET_FORM
})