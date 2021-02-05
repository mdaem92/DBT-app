import moment from 'moment'
export const editJournal = () => {

}
export const removeJournal = () => {

}

export const submitAndMergeJournal = (state, journal) => {

    const newJournalTimestamp = journal.timestamp
    const newJournalDate = moment.unix(newJournalTimestamp).format("MM/DD/YYYY");
    
    const index = state.findIndex(({ timestamp }) => {
        const journalDate = moment.unix(timestamp).format("MM/DD/YYYY");
        return journalDate === newJournalDate

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