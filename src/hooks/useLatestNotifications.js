import { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase.utils'
import _ from 'lodash'


const useLatestNotifications = (uid) => {
    const [notifications,setNotifications] = useState([])
    const getLatestDocs = ()=>{
        const collection = firestore.collection(`users/${uid}/notifications`)
        const unsubscribe = collection.onSnapshot((querySnapshot)=>{
            // querySnapshot.docChanges().forEach(change=>{
                
            //     if(change.type==="added"){
            //         console.log("added document",change.doc.data());
            //     }
            //     if(change.type==="modified"){
            //         console.log("modified document",change.doc.data());
            //     }
            //     if(change.type==="removed"){
            //         console.log("removed document",change.doc.data());
            //     }
            // })
            const temp = []
            querySnapshot.docChanges().forEach((change)=>{
                if(change.type==="added"){
                    // setNotifications([...notifications,change.doc.data()])
                    temp.push(change.doc.data())
                }
            })
            setNotifications(temp)
            // console.log("querysnapshot ",querySnapshot);
            // console.log("metadata: ",querySnapshot.metadata)
            // querySnapshot.docs.forEach((doc)=>console.log("doc: ",doc,"\n"))

        })
        return unsubscribe       
    }
    useEffect(()=>{
        const unsubscribe = getLatestDocs()
        return ()=>{
            unsubscribe()
        }
    },[])
    return notifications
}

export default useLatestNotifications