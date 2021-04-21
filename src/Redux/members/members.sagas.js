import { takeLatest, put, all, call } from 'redux-saga/effects'
import { firestore } from '../../firebase/firebase.utils';
import { fetchMembersFailure, fetchMembersSuccess } from './members.actions';
import MembersActionTypes from './members.types'



const getMembersFromSnapshot = (snapshot)=>{
    console.log("from getmembersFromSnapshot",snapshot);
    return snapshot.docs.map((user)=>{
        const userData = user.data()
        console.log("got member data: ",userData);
        return userData
    })
}

function* fetchMembersAsync() {
    try {
        yield console.log('from saga');
        const membersRef = yield firestore.collection("users")
        console.log("members ref: ",membersRef);
        const snapshot =yield membersRef.get()
        const members = yield getMembersFromSnapshot(snapshot)
        yield put(fetchMembersSuccess(members))
    } catch (error) {
        yield put(fetchMembersFailure(error))
    }

}

function* onFetchMembersStart() {
    yield takeLatest(
        MembersActionTypes.FETCH_MEMBERS_START,
        fetchMembersAsync
    )
}

export function* membersSagas() {
    yield all([
        call(onFetchMembersStart)
    ])
}