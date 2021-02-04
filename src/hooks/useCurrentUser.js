import { useEffect, useState } from "react"
import { auth, createUserProfile } from '../firebase/firebase.utils'
const useCurrentUser = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userAuth) => {
            
            createUserProfile(userAuth).then((userRef)=>{
                if (userRef) {
                    console.log('user ref is: ',userRef);
                    userRef.onSnapshot(snapshot => {
                        console.log('snapshot id:', snapshot.id);
                        setUser({...snapshot.data()})
                    })
                } 
            })
            
           
            // setUser(userAuth)
            // console.log("user: ",user);
        })
        return () => {
            unsubscribe()
        }
    }, [])
    return user
}

export default useCurrentUser