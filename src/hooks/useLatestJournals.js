import {useEffect,useState} from 'react'
import { firestore } from '../firebase/firebase.utils'
import moment from 'moment'

const useFriendJournals = (id,dateFrom,dateTo,currentPage,pageSize)=>{
    const [journals, setJournals] = useState([])

    const getFriendLatestJournals = ()=>{
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
            const from = (currentPage-1)*pageSize
            const to = from +pageSize 
            const paginatedData = [
                ...filteredData.splice(from,to-1)
            ]
            // console.log(`from: ${from} to: ${to}`);
            // console.log(currentPage,pageSize);
            setJournals(paginatedData)
        })
        return unsubscribe
    }
    useEffect(()=>{
        const unsubscribe = getFriendLatestJournals()
        return ()=>{
            unsubscribe()
        }
    },[dateFrom,dateTo,pageSize,currentPage])
    return journals 

}

export default useFriendJournals