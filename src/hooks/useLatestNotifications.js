import { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase.utils'


const useLatestNotifications = (uid) => {

    const getLatestDocs = ()=>{
        const collection = firestore.collection(`users/${uid}/notifications`).limitToLast(5).orderBy("date")
        const unsubscribe = collection.onSnapshot((querySnapshot)=>{
            querySnapshot.docChanges().forEach(change=>{
                
                if(change.type==="added"){
                    console.log("added document",change.doc.data());
                }
                if(change.type==="modified"){
                    console.log("modified document",change.doc.data());
                }
                if(change.type==="removed"){
                    console.log("removed document",change.doc.data());
                }
            })
            console.log("querysnapshot ",querySnapshot);
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
    })
}

export default useLatestNotifications