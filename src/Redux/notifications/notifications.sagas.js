import { all, call, put, takeLatest,takeEvery } from "redux-saga/effects";
import { firestore,auth } from "../../firebase/firebase.utils";
import { notifyFriendsFailure, notifyFriendsSuccess, removeNotificationsFailure, removeNotificationsSuccess, sendRequestFailure, sendRequestStart, sendRequestSuccess } from "./notifications.actions";
import NotificationsActionTypes from './notifications.types'



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

const checkIfNotifAlreadySent = (snapshot,notifType,notifSender)=>{
    const index = snapshot.docs.findIndex((notification)=>{
        const {type,senderId} = notification.data()
        return type===notifType && notifSender === senderId
    })
    return index>-1
}

const checkFriendAlreadyExists = (snapshot,receiverId)=>{
    const index = snapshot.docs.findIndex((notification)=>{
        const {id} = notification.data()
        return id ===receiverId
    })
    return index>-1
}



function* sendRequestAsync({sender,receiverId,requestType}){
    
    try {
        yield console.log('sender  : ',sender)
        yield console.log('receiver id : ',receiverId)
        yield console.log('request type: ',requestType);
        const collectionRef = firestore.collection(`users/${receiverId}/notifications`)
        const usersCollectionRef = yield firestore.collection('users')
        const usersCollectionSnapshot = yield usersCollectionRef.get()
        const uids = yield call(getUsersIdsFromSnapshot,usersCollectionSnapshot)
        const {uid,displayName,photoURL} = sender
        if(uids.indexOf(receiverId)>=0){
            const notification = {
                // ...rest,
                type:requestType,
                responded:false,
                senderId:uid,
                photoURL,
                senderName:displayName
                // date:now
            }
            if(requestType==='ADD_REQUEST'){
                const receiverNotifsSnapshot = yield collectionRef.get()
                const isNotifAlreadySent = yield call(checkIfNotifAlreadySent,receiverNotifsSnapshot,requestType,uid)
                const friendsRef = yield firestore.collection(`users/${uid}/friends`)
                const friendsSnapshot = yield friendsRef.get()
                const doesFriendAlreadyExist = yield call(checkFriendAlreadyExists,friendsSnapshot,receiverId)
                if (!doesFriendAlreadyExist){
                    if(!isNotifAlreadySent){
                        yield collectionRef.add(notification)
                        yield put(sendRequestSuccess(notification)) 
                    }else{
                        throw new Error("Request already sent")
                    }
                }else{
                    throw new Error("This user is already added")

                }
                
            }else{
                yield collectionRef.add(notification)
                yield put(sendRequestSuccess(notification)) 
            }
            
            // yield collectionRef.add(notification)
            // yield put(sendRequestSuccess(notification))
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
    yield takeEvery(
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
    yield takeEvery(
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



