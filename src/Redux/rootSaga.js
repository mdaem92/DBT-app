import {submitJournalStart,fetchJournalsStart} from './journals/journals.sagas'
import {userSagas} from './user/user.sagas'
import {call,all} from 'redux-saga/effects'

export function* rootSaga() {
    yield all([
        call(submitJournalStart),
        call(fetchJournalsStart),
        call(userSagas)
    ])
}