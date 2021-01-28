import { useEffect, useState } from "react"
import {auth} from '../firebase/firebase.utils'
const useCurrentUser = ()=>{
    const [user,setUser] = useState(null)

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            
            setUser(user)
            console.log("user: ",user);
        })
        return ()=>{
            unsubscribe()
        }
    },[])
    return user
}

export default useCurrentUser