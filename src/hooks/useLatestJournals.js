import {useEffect,useState} from 'react'
import { firestore } from '../firebase/firebase.utils'

const useFriendJournals = (id)=>{
    const [journals, setJournals] = useState([])

    const getFriendLatestJournals = ()=>{

        const collectionRef = firestore.collection(`users/${id}/journals`)

        const unsubscribe = collectionRef.onSnapshot((querySnapshot)=>{
            const data = []

            querySnapshot.docs.forEach((journal)=>{
                data.push({...journal.data()})
            })

            setJournals(data)
        })
        return unsubscribe
    }
    useEffect(()=>{
        const unsubscribe = getFriendLatestJournals()
        return ()=>{
            unsubscribe()
        }
    },[])
    return journals 

}

export default useFriendJournals