import { all, call, put, takeLatest } from "redux-saga/effects";
import { firestore, Timestamp } from "../../firebase/firebase.utils";
import { fetchNotificationsFailure, fetchNotificationsSuccess, removeNotificationsFailure, removeNotificationsSuccess, sendRequestFailure, sendRequestSuccess } from "./notifications.actions";
import NotificationsActionTypes from './notifications.types'
import moment from 'moment'



// const getNotificationsFromSnapshot = (snapshot)=>{
//     return snapshot.docs.map((notification)=>{
//         const notifData = notification.data()
//         // console.log("got member data: ",userData);
//         return notifData
//     })
// }

const getUsersIdsFromSnapshot = (snapshot)=>{
    return snapshot.docs.map((user)=>{
        const {uid} = user.data()
        return uid
    })
}


function* sendRequestAsync({sender,receiverId,requestType}){
    
    try {
        yield console.log('receiver id : ',receiverId)
        const collectionRef = firestore.collection(`users/${receiverId}/notifications`)
        const usersCollectionRef = yield firestore.collection('users')
        const usersCollectionSnapshot = yield usersCollectionRef.get()
        const uids = yield call(getUsersIdsFromSnapshot,usersCollectionSnapshot)
        const {uid,displayName,...rest} = sender
        if(uids.indexOf(receiverId)>=0){
            const notification = {
                ...rest,
                type:requestType,
                responded:false,
                senderId:uid,
                senderName:displayName
                // date:now
            }
            yield collectionRef.add(notification)
            yield put(sendRequestSuccess(notification))
        }else{
            throw new Error("User with the given id does not exist")
        }

        
    } catch (error) {
        yield put(sendRequestFailure(error.message))
    }
}

function* removeNotificationAsync({uid,notifID}){
    try {

        const docRef = yield firestore
            .collection('users')
            .doc(`${uid}`)
            .collection('notifications')
            .doc(`${notifID}`)
        yield console.log();
        console.log('removing notif with id:',notifID);
        yield docRef.delete()

        yield put(removeNotificationsSuccess(notifID))
        
    } catch (error) {
        yield put(removeNotificationsFailure(error.message))
    }
}

// function* onFetchNotificationsStart(){
//     yield takeLatest(
//         NotificationsActionTypes.FETCH_NOTIFICATION_START,
//         fetchNotificationsAsync
//     )
// }

function* onSendRequestStart(){
    yield takeLatest(
        NotificationsActionTypes.SEND_REQUEST_START,
        sendRequestAsync
    )
}

function* onRemoveNotificationStart(){
    yield takeLatest(
        NotificationsActionTypes.REMOVE_NOTIFICATION_START,
        removeNotificationAsync
    )
}

export function* notificationsSaga(){
    yield all([
        // call(onFetchNotificationsStart),
        call(onSendRequestStart),
        call(onRemoveNotificationStart)
    ])
}

