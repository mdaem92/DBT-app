export const removeTeammate = (list,id)=> list.filter(({uid})=>uid !== id)

export const removeTag = (list,tag)=>list.filter((item)=>item!==tag)

export const addTeammate = (teammates,teammate)=>teammates.push(teammate)