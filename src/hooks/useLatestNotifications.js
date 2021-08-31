import { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase.utils'


const useLatestNotifications = (uid) => {
    const [notifications,setNotifications] = useState([])
    const getLatestNotifications = ()=>{
        const collection = firestore.collection(`users/${uid}/notifications`)
        const unsubscribe = collection.onSnapshot((querySnapshot)=>{

            const temp = []
            // querySnapshot.docChanges().forEach((change)=>{
            //     if(change.type==="added"){
            //         // setNotifications([...notifications,change.doc.data()])
            //         console.log('the notif id: ',change.doc.id);
            //         temp.push({...change.doc.data(),notifID:change.doc.id})
            //     }
            // })

            querySnapshot.docs.forEach((notif)=>{
                temp.push({...notif.data(),notifID:notif.id})
            })

            setNotifications(temp)
            // console.log("querysnapshot ",querySnapshot);
            // console.log("metadata: ",querySnapshot.metadata)
            // querySnapshot.docs.forEach((doc)=>console.log("doc: ",doc,"\n"))

        })
        return unsubscribe       
    }
    useEffect(()=>{
        
        const unsubscribe = getLatestNotifications()
        return ()=>{
            unsubscribe()
        }
    },[])
    return notifications
}

export default useLatestNotifications