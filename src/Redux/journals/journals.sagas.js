import { takeEvery, call, all, put, take } from 'redux-saga/effects'
import { JournalsActionTypes } from './journals.types'
import firebase,{ firestore,Timestamp } from '../../firebase/firebase.utils'
import { submitJournalSuccess } from './journals.actions'

// function* submitJournalAsync({ uid, displayName, ...journalData }) {
//     yield console.log('attempting to submit');
//     // try {
//     //     yield firestore.doc(`users/${uid}`).set({ ...journalData }, { merge: true })
//     //     yield put(submitJournalSuccess({uid,displayName,...journalData}))   
//     // } catch (e) {
//     //     console.log(e);
//     // }
// }


export function* submitJournalAsync({journal:{uid,displayName,date,...journalData}}) {
    
    yield console.log('submitting for: ',uid,displayName);
    yield console.log('date obj: ',date)
    const timestamp = Timestamp.fromDate(date.toDate())
    try {
        yield firestore.doc(`users/${uid}`).collection('journals').add({...journalData,date:timestamp})
        yield put(submitJournalSuccess({...journalData,uid,displayName}))

    } catch (error) {
        console.log(error);
    }
}

export function* submitJournalStart() {
    yield takeEvery(
        JournalsActionTypes.SUBMIT_JOURNAL_START,
        submitJournalAsync
    )
}