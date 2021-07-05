import {FormActionTypes}from './form.types'

const formDefaultState = {

    date:undefined,
    isDeadlineMissed:false,
    lastNightSummary:'',
    goalDescription:'',
    isMorningReport:true,
    mood:undefined,
    tension:undefined,
    mood2:undefined,
    tension2:undefined,
    selfEsteemReport:'',
    positiveReport:'',
    additionalNotesMorning:'',
    additionalNotesEvening:'',
    todaysGoal:'',
    strongestEmotion:'',
    strongestEmotion2:'',

    


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