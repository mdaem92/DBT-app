import {call,all,put,takeLatest} from 'redux-saga/effects'
import UserActionTypes from './user.types'
import {auth, createUserProfile, firestore, getUserAuth, googleAuthProvider , signInWithGoogle} from "../../firebase/firebase.utils";
import {
    signInStart,
    signInSuccess,
    signInFailure,
    signOutFailure,
    signOutStart,
    signOutSuccess,
    addTeammateFailure,
    addTeammateSuccess
} from './user.actions'

function* getSnapShotFromUserAuth(userAuth){

    try{
        const userRef = yield call(createUserProfile,userAuth)
        const userSnapshot = yield userRef.get()
        yield put(signInSuccess({
            id:userSnapshot.id,
            ...userSnapshot.data()
        }))
    }catch(errorMessage){
        yield put(signInFailure(errorMessage))
    }

}

function* addTeammateAsync({uid,teammateID}){
    try {
        yield console.log('teammate:',teammateID);
        yield console.log('current user:',uid);

        yield firestore
            .collection(`users/${uid}/friends`)
            .add({
                teammateID:teammateID
            })
        
        yield put(addTeammateSuccess(teammateID))

    } catch (error) {
        console.log(error);
        yield put(addTeammateFailure(error.message))
    }
}

function* signInAsync(){
    try{
        const {user} = yield signInWithGoogle()
        yield call(getSnapShotFromUserAuth,user)

    }catch(e){
        yield put(signInFailure(e))
    }
}

function* signOutAsync(){
    try{
        console.log('got here');
        yield auth.signOut()
        yield put(signOutSuccess())
    }catch(e){
        yield put(signOutFailure(e))
    }
}



function* onSignInStart (){
    yield takeLatest(
        UserActionTypes.SIGN_IN_START,
        signInAsync
    )
}

function* onSignOutStart(){
    yield takeLatest(
        UserActionTypes.SIGN_OUT_START,
        signOutAsync
    )
}
function* onAddTeammateStart(){
    yield takeLatest(
        UserActionTypes.ADD_TEAMMATE_START,
        addTeammateAsync
    )
}

// function* onSendRequestStart(){
//     yield takeLatest(
//         UserActionTypes.SEND_REQUEST_START,
//         sendRequestAsync
//     )
// }

export function* userSagas(){
    yield all([
        call(onSignInStart),
        call(onSignOutStart),
        // call(onSendRequestStart)
        call(onAddTeammateStart)
    ])
}