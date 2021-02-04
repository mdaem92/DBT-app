import {journalSagas} from './journals/journals.sagas'
import {call,all} from 'redux-saga/effects'

export function* rootSaga() {
    yield all([
        call(journalSagas)
    ])
}