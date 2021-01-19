import {createSelector} from 'reselect'

export const journalsSelector = ({journals})=>journals

export const moodsSelector = createSelector(
    journalsSelector,
    (journals)=>{
        return journals.reduce((acc,{name,mood,mood2})=>{
            return [...acc,{name,mood,mood2}]
        },[])
    }
)
export const tensionsSelector = createSelector(
    journalsSelector,
    (journals)=>{
        return journals.reduce((acc,{name,tension,tension2})=>{
            return [...acc,{name,tension,tension2}]
        },[])
    }
)