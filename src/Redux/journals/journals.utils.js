export const editJournal = () => {

}
export const removeJournal = () => {

}

export const submitAndMergeJournal = (state, journal) => {

    const newJournalDate = journal.date
    console.log('date of new journal: ',journal);
    // const newJournalDate = moment.unix(newJournalTimestamp).format("MM/DD/YYYY");
    
    const index = state.findIndex(({ date }) => {
        // const journalDate = moment.unix(timestamp).format("MM/DD/YYYY");
        // console.log(`${date} vs ${newJournalDate}`);
        
        return date === newJournalDate
    })

    if (index>=0){
        const merged = {
            ...state[index],
            ...journal
        }
        return [
            ...state.slice(0,index),
            {...merged},
            ...state.slice(index+1)
        ]

    }
    else return [
        ...state,
        {...journal}
    ]
    

}