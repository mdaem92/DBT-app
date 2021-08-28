import { call, all, put, takeLatest } from 'redux-saga/effects'
import UserActionTypes from './user.types'
import { auth, createUserProfile, firestore, getUserAuth, googleAuthProvider, signInWithGoogle } from "../../firebase/firebase.utils";
import {
    signInStart,
    signInSuccess,
    signInFailure,
    signOutFailure,
    signOutStart,
    signOutSuccess,
    addTeammateFailure,
    addTeammateSuccess,
    fetchTeammatesFailure,
    fetchTeammatesSuccess,
    setDeadlineFailure,
    setDeadlineSuccess,
    fetchDeadlineFailure,
    fetchDeadlineSuccess,
    fetchTagsFailure,
    fetchTagsSuccess,
    addTagFailure,
    addTagSuccess,
    removeTagFailure,
    removeTagSuccess
} from './user.actions'

function* getSnapShotFromUserAuth(userAuth) {

    try {
        const userRef = yield call(createUserProfile, userAuth)
        const userSnapshot = yield userRef.get()
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }))
    } catch (errorMessage) {
        yield put(signInFailure(errorMessage))
    }

}

function* addTeammateAsync({ uid, teammate }) {
    try {
        yield console.log('teammate:', teammate);
        yield console.log('current user:', uid);


        yield firestore
            .collection(`users/${uid}/friends`)
            .add({
                ...teammate
            })

        yield put(addTeammateSuccess(teammate))

    } catch (error) {
        console.log(error);
        yield put(addTeammateFailure(error.message))
    }
}

function* addTagAsync({ newTag }) {
    try {
        const uid = auth.currentUser.uid
        yield firestore.collection(`users/${uid}/tags`)
            .add({tag:newTag})
        yield put(addTagSuccess(newTag))
    } catch (error) {
        yield put(addTagFailure(error.message))
    }
}

function* signInAsync() {
    try {
        const { user } = yield signInWithGoogle()
        yield call(getSnapShotFromUserAuth, user)

    } catch (e) {
        yield put(signInFailure(e))
    }
}

function* signOutAsync() {
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch (e) {
        yield put(signOutFailure(e))
    }
}

const getDataFromSnapshot = (snapshot) => {
    return snapshot.docs.map(doc => {
        // console.log('the id is: ',doc.id);
        return {
            ...doc.data()
        }
    })
}

const getTagsListFromArrayOfTagObjects=(arrayOfObjs)=>{
    return arrayOfObjs.map(obj=>obj.tag)
}

function* fetchTeammatesAsync() {
    try {
        const uid = yield auth.currentUser.uid
        const teammatesRef = yield firestore.collection(`users/${uid}/friends`)
        const teammatesSnapshot = yield teammatesRef.get()
        const teammates = getDataFromSnapshot(teammatesSnapshot)
        yield put(fetchTeammatesSuccess(teammates))
    } catch (error) {
        yield put(fetchTeammatesFailure(error.message))
    }
}

function* fetchTagsAsync() {
    try {
        const uid = auth.currentUser.uid
        const tagsRef = yield firestore.collection(`users/${uid}/tags`)
        const tagsSnapshot = yield tagsRef.get()
        const tags = getDataFromSnapshot(tagsSnapshot)
        const list = getTagsListFromArrayOfTagObjects(tags)
        console.log('the list: ',list);
        yield put(fetchTagsSuccess(list))
    } catch (error) {
        yield put(fetchTagsFailure(error.message))
    }
}

function* setDeadlineAsync({ deadlineType, value }) {
    try {
        const uid = auth.currentUser.uid
        yield firestore.doc(`users/${uid}`).set({ [deadlineType]: value }, { merge: true })
        yield put(setDeadlineSuccess(deadlineType, value))
    } catch (error) {
        yield put(setDeadlineFailure(error.message))
    }
}

function* fetchDeadlineAsync() {
    try {
        const uid = auth.currentUser.uid
        const docRef = yield firestore.doc(`users/${uid}`)
        const deadlineDoc = yield docRef.get()
        console.log('getting duser data: ', deadlineDoc);
        if (deadlineDoc.exists) {
            const { morningDeadline, eveningDeadline } = deadlineDoc.data()
            yield put(fetchDeadlineSuccess({ morningDeadline, eveningDeadline }))
        }
    } catch (error) {
        yield put(fetchDeadlineFailure(error.message))
    }
}

const getIdToRemove = (snapshot,tag)=>{

    return snapshot.docs.reduce((acc,doc)=>{
        if(doc.data().tag===tag){
            acc = doc.id
            return acc
        }
    },0)

}

function* removeTagAsync({ tag }) {
    try {
        const uid = auth.currentUser.uid
        const tagsRef = yield firestore.collection(`users/${uid}/tags`)
        const tagsSnapshot = yield tagsRef.get()
        const idToRemove = yield getIdToRemove(tagsSnapshot,tag)
        yield tagsRef.doc(idToRemove).delete()
        // const tags = yield getDataFromSnapshot(tagsSnapshot)
        // const list = yield getTagsListFromArrayOfTagObjects(tags)
        
        yield put(removeTagSuccess(tag))

    } catch (error) {
        yield put(removeTagFailure(error.message))
    }
}



function* onSignInStart() {
    yield takeLatest(
        UserActionTypes.SIGN_IN_START,
        signInAsync
    )
}

function* onSignOutStart() {
    yield takeLatest(
        UserActionTypes.SIGN_OUT_START,
        signOutAsync
    )
}
function* onAddTeammateStart() {
    yield takeLatest(
        UserActionTypes.ADD_TEAMMATE_START,
        addTeammateAsync
    )
}

function* onFetchTeammatesStart() {
    yield takeLatest(
        UserActionTypes.FETCH_TEAMMATES_START,
        fetchTeammatesAsync
    )
}

function* onSetDeadlineStart() {
    yield takeLatest(
        UserActionTypes.SET_DEADLINE_START,
        setDeadlineAsync
    )
}
function* onFetchDeadlineStart() {
    yield takeLatest(
        UserActionTypes.FETCH_DEADLINE_START,
        fetchDeadlineAsync
    )
}

function* onFetchTagsStart() {
    yield takeLatest(
        UserActionTypes.FETCH_TAGS_START,
        fetchTagsAsync
    )
}

function* onAddTagStart() {
    yield takeLatest(
        UserActionTypes.ADD_TAG_START,
        addTagAsync
    )
}

function* onRemoveTagStart() {
    yield takeLatest(
        UserActionTypes.REMOVE_TAG_START,
        removeTagAsync
    )
}

export function* userSagas() {
    yield all([
        call(onSignInStart),
        call(onSignOutStart),
        // call(onSendRequestStart)
        call(onAddTeammateStart),
        call(onFetchTeammatesStart),
        call(onSetDeadlineStart),
        call(onFetchDeadlineStart),
        call(onFetchTagsStart),
        call(onAddTagStart),
        call(onRemoveTagStart)
    ])
}