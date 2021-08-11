import { all, call, put, takeLatest } from "redux-saga/effects";
import { firestore, Timestamp,auth } from "../../firebase/firebase.utils";
import { fetchNotificationsFailure, fetchNotificationsSuccess, notifyFriendsFailure, notifyFriendsSuccess, removeNotificationsFailure, removeNotificationsSuccess, sendRequestFailure, sendRequestStart, sendRequestSuccess } from "./notifications.actions";
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

const getFriendsFromSnapshot = (snapshot)=>{
    return snapshot.docs.map((friend)=>{
        const friendData = friend.data()
        return friendData
    })

}




function* sendRequestAsync({sender,receiverId,requestType}){
    
    try {
        yield console.log('sender id : ',sender)
        yield console.log('receiver id : ',receiverId)
        yield console.log('request type: ',requestType);
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

function* notifyFriendsAsync({notifType}){
    console.log('notifying users');
    try {
        const uid = yield auth.currentUser.uid
        yield console.log('url: ',auth.currentUser.photoURL);
        const friendsListRef = yield firestore.collection(`users/${uid}/friends`)
        const friendsListSnapshot = yield friendsListRef.get()
        console.log('friends snapshot: ',friendsListSnapshot , uid);
        console.log(friendsListSnapshot.exists);
        
        const friendsList = yield getFriendsFromSnapshot(friendsListSnapshot)
        console.log('friends list: ',friendsList);

        for (var friend of friendsList) {
            console.log('notifying friend: ',friend);
            const sender = {uid:auth.currentUser.uid,photoURL:auth.currentUser.photoURL,displayName:auth.currentUser.displayName}
            console.log('auth current sender: ',sender);
            yield put(sendRequestStart(sender,friend.id,notifType))
        }
        yield put(notifyFriendsSuccess())
        
        
    } catch (error) {
        yield put(notifyFriendsFailure(error.message))
    }
}


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

function* onNotifyFriendsStart(){
    yield takeLatest(
        NotificationsActionTypes.NOTIFY_FRIENDS_START,
        notifyFriendsAsync
    )
}

export function* notificationsSaga(){
    yield all([
        // call(onFetchNotificationsStart),
        call(onSendRequestStart),
        call(onRemoveNotificationStart),
        call(onNotifyFriendsStart)
    ])
}



