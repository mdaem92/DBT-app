import {useEffect,useState} from 'react'
import { firestore } from '../firebase/firebase.utils'
import moment from 'moment'

const useFriendJournals = (id,dateFrom=undefined,dateTo=undefined,currentPage=undefined,pageSize=undefined,entriesPerChart=undefined)=>{
    const [journals, setJournals] = useState([])
    console.log('got  ',id,dateFrom,dateTo,currentPage,pageSize,entriesPerChart);
    const getFriendLatestJournals = ()=>{
        console.log(`show date from ${dateFrom} to ${dateTo}`);
        const collectionRef = firestore.collection(`users/${id}/journals`).orderBy('date')

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
            // .sort((a, b) => moment(a.date) > moment(b.date) ? -1 : 1)

            if(typeof currentPage !=='undefined'){
                const from = (currentPage-1)*pageSize
                const to = from +pageSize 
                const paginatedData = [
                    ...filteredData.splice(from,to)
                ].sort((a,b)=>moment(a.date)>moment(b.date)?-1:1)
                setJournals(paginatedData)
            }else{
                setJournals([...filteredData.slice(entriesPerChart*-1)])
            }

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