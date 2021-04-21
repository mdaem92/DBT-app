import {submitJournalStart,fetchJournalsStart} from './journals/journals.sagas'
import {userSagas} from './user/user.sagas'
import {call,all} from 'redux-saga/effects'
import { membersSagas } from './members/members.sagas'

export function* rootSaga() {
    yield all([
        call(submitJournalStart),
        call(fetchJournalsStart),
        call(userSagas),
        call(membersSagas)
    ])
}