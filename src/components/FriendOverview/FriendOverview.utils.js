export const getMoodAndTensionData = (journals)=>{
    return journals.reduce((acc,{date,mood,mood2,tension,tension2})=>{
        return {
            moodData:[...acc,{date,mood,mood2}],
            tensionData:[...acc,{date,tension,tension2}]
        }
    },[])
}