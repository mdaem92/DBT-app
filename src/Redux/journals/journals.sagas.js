import { takeLatest, put} from 'redux-saga/effects'
import { JournalsActionTypes } from './journals.types'
import { firestore, Timestamp } from '../../firebase/firebase.utils'
import { submitJournalSuccess,fetchJournalsFailure,fetchJournalsSuccess } from './journals.actions'
import moment from 'moment';
import { notifyFriendsStart } from '../notifications/notifications.actions';


export function* submitJournalAsync({ journal: { uid, displayName, date, isMorningReport, ...journalData } }) {

    yield console.log('submitting for: ', uid, displayName);
    yield console.log('date obj: ', date)

    const timestamp = Timestamp.fromDate(date.toDate())
    try {
        yield firestore
            .doc(`users/${uid}`)
            .collection('journals')
            .doc(`${date.format('DD MM YYYY')}`)
            .set({ ...journalData, date: timestamp }, { merge: true })
            
        yield put(submitJournalSuccess({ ...journalData, uid, displayName, date:date.format('DMMM YY'), isMorningReport }))
        yield put(notifyFriendsStart('SUBMITTED_REPORT'))

    } catch (error) {
        console.log(error);
    }
}

const getJournalsFromSnapshot = (snapshot)=>{
    return snapshot.docs.map((doc)=>{
        const {date,...otherprops} = doc.data()
        console.log('db date: ',date.seconds);
        return {
            ...otherprops,
            date:moment.unix(date.seconds).format('DMMM YY')
        }
        // return doc.data()
    })
}
export function* fetchJournalsAsync({uid}){
    
    try {
        const journalsRef = yield firestore.doc(`users/${uid}`).collection('journals')
        const snapshot = yield journalsRef.get()
        const journals = yield getJournalsFromSnapshot(snapshot)
        yield console.log('fetched journals: ',journals)
        yield put(fetchJournalsSuccess(journals))

    } catch (error) {
        
        yield put(fetchJournalsFailure())
        console.log(error);
    }
}

export function* submitJournalStart() {
    yield takeLatest(
        JournalsActionTypes.SUBMIT_JOURNAL_START,
        submitJournalAsync
    )
}
export function* fetchJournalsStart(){
    yield takeLatest(
        JournalsActionTypes.FETCH_JOURNALS_START,
        fetchJournalsAsync
    )
}