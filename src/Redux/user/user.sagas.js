import {call,all,put,takeLatest} from 'redux-saga/effects'
import UserActionTypes from './user.types'
import {auth, createUserProfile, getUserAuth, googleAuthProvider , signInWithGoogle} from "../../firebase/firebase.utils";
import {
    signInStart,
    signInSuccess,
    signInFailure,
    signOutFailure,
    signOutStart,
    signOutSuccess
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

export function* userSagas(){
    yield all([
        call(onSignInStart),
        call(onSignOutStart)
    ])
}