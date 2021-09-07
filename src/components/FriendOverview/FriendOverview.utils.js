export const getMoodAndTensionData = (journals)=>{
    return journals.reduce((acc,{date,mood,mood2,tension,tension2})=>{
        // console.log('current accumulator: ',acc);
        // acc.push({date,mood,mood2,tension,tension2})
        return {
            moodData:[...acc,{date,mood,mood2}],
            tensionData:[...acc,{date,tension,tension2}]
        }
    },[])
} 

export const getMoodData = (journals)=>{
    
    return journals.reduce((acc,{date,mood,mood2})=>{
        console.log('current accumulator',acc);
        return [...acc,{date,mood,mood2}]
    },[])
}

export const getTensionData = (journals)=>{
    
    return journals.reduce((acc,{date,tension,tension2})=>{
        console.log('current accumulator',acc);
        return [...acc,{date,tension,tension2}]
    },[])
}
