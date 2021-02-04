import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};


firebase.initializeApp(config)

export const firestore = firebase.firestore()
export const auth = firebase.auth()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
})
export const sigInWithGoogle = () => auth.signInWithPopup(googleAuthProvider)


export const createUserProfile = async (userAuth) => {
  
  if (!userAuth) return
  console.log('creating user profile: ',userAuth);
  const {uid,displayName,email} = userAuth
  const userRef = firestore.doc(`users/${uid}`)
  console.log('user ref: ',userRef);
  const userSnapshot = await userRef.get()
  console.log('user snapshot: ',userSnapshot);
  
  if (!userSnapshot.exists) {
    console.log('its a new user in db');
    try {
      userRef.set({
        displayName,
        email,
        uid
      })
    } catch (error) {
      console.log('error creating user');
    }
  }
  return userRef
}
export const Timestamp = firebase.firestore.Timestamp
export default firebase

