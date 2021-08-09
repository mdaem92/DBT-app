import {useEffect,useState} from 'react'
import { firestore } from '../firebase/firebase.utils'
import moment from 'moment'

const useFriendJournals = (id,dateFrom,dateTo)=>{
    const [journals, setJournals] = useState([])

    const getFriendLatestJournals = (from,to)=>{
        console.log(`show date from ${dateFrom} to ${dateTo}`);
        const collectionRef = firestore.collection(`users/${id}/journals`)

        const unsubscribe = collectionRef.onSnapshot((querySnapshot)=>{
            const data = []

            querySnapshot.docs.forEach((journal)=>{
                const {date,...rest} = journal.data()
                data.push({
                    ...rest,
                    date:moment.unix(date.seconds).format('DMMM YY')
                })
  
            })
            const filteredData = data.filter((journal)=>{
                const matchFrom = dateFrom? moment(journal.date)>=moment(dateFrom):true
                const matchTo = dateTo? moment(journal.date)<=moment(dateTo):true
                console.log(`journal date ${journal.date} match from: ${matchFrom} match to ${matchTo} moment: ${moment(journal.date)}`);
                return matchFrom && matchTo
            }) 
            setJournals(filteredData)
        })
        return unsubscribe
    }
    useEffect(()=>{
        const unsubscribe = getFriendLatestJournals(dateFrom,dateTo)
        return ()=>{
            unsubscribe()
        }
    },[dateFrom,dateTo])
    return journals 

}

export default useFriendJournals