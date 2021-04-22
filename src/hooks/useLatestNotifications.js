import { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase.utils'


const useLatestNotifications = (uid) => {
    // // const [notifications, setNotifications] = useState(0)
    // useEffect(() => {
    //     const collection = firestore.doc(`users/${uid}`).collection('journals')
    //     const unsubscribe = collection.onSnapshot((snapshot) => {
    //         console.log(snapshot);

    //         snapshot.docs.forEach(doc=>console.log(doc.data()))
         
    //     }, err => {
    //         console.log(`error: ${err}`);
    //     })
        
    //     return ()=>{
    //         unsubscribe()
    //     }

    // },[])
    // // return notifications

    // const [docs,setDocs] = useState([])
    const getLatestDocs = ()=>{
        const collection = firestore.collection(`users/${uid}/journals`).limitToLast(5).orderBy("date")
        const unsubscribe = collection.onSnapshot((querySnapshot)=>{
            querySnapshot.docChanges().forEach(change=>{
                // switch (change.type) {
                //     case "added":
                //         console.log("new document: ",change.doc.data())
                //         break
                //     case "removed":
                //         console.log("removed document",change.doc.data())
                //         break
                //     case "modified":
                //         console.log("modified document",change.doc.data())
                //         break
                //     default:
                //         break;
                // }
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
            console.log("metadata: ",querySnapshot.metadata)
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