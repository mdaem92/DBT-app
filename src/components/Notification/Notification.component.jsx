import React, { useState } from 'react'
import { Container, ImageContainer, ContentContainer, ButtonsContainer } from './Notification.styles'
import { Button, Modal } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { addTeammateStart } from '../../Redux/user/user.actions'
import { createStructuredSelector } from 'reselect'
import { currentUserSelector } from '../../Redux/user/user.selectors'
import { removeNotificationStart, sendRequestStart } from '../../Redux/notifications/notifications.actions'
import {withRouter} from 'react-router-dom'

const Notification = ({ senderName, senderId, photoURL, type, responded, currentNotifications, addTeammate, currentUser, notifID, removeNotification, sendRequest , history }) => {
    const [isConfirmModalShown, setConfirmModalVisibility] = useState(false)
    const [isRejectModalShown, setRejectModalVisibility] = useState(false)

    console.log('notif from Notification component ', notifID);
    const labels = {
        "ADD_REQUEST": "requested access.",
        "SUBMITTED_REPORT": "submitted report.",
        "EVENING_DEADLINE_MISSED": "missed evening deadline.",
        "MORNING_DEADLINE_MISSED": "missed morning deadline.",
        "ACCEPTED_REQUEST": "Accepted your request."
    }

    const handleButtonClick = (type) => {
        if (type === 'confirm') {
            console.log('confirming');
            setConfirmModalVisibility(true)
        }
        if (type === 'reject') {
            console.log('rejecting');
            setRejectModalVisibility(true)

        }
    }


    const handleAddFriendConfirm = () => {
        console.log('confirming friend request confirm');
        addTeammate(currentUser.uid, {id:senderId,displayName:senderName,photoURL})
        addTeammate(senderId, {id:currentUser.uid, photoURL:currentUser.photoURL, displayName:currentUser.displayName})
        sendRequest(currentUser, senderId, "ACCEPTED_REQUEST")

        removeNotification(currentUser.uid, notifID)
        setConfirmModalVisibility(false)
    }

    const handleAddFriendCancel = () => {
        console.log('cancelling friend request confirm');
        setConfirmModalVisibility(false)
    }

    const handleRejectRequestConfirm = () => {
        console.log('confirming the friend requst rejection');
        removeNotification(currentUser.uid, notifID)
        setRejectModalVisibility(false)
    }

    const handleRejectRequestCancel = () => {
        console.log('cancelling the friend requst rejection');
        console.log('is modal visible? ', isConfirmModalShown);
        setRejectModalVisibility(false)
    }

    const handleNotifSeen = ()=>{
        removeNotification(currentUser.uid, notifID)
        setRejectModalVisibility(false)
    }

    const handleViewNotif = ()=>{
        if(type==='SUBMITTED_REPORT'){
            console.log('clicking',senderId);
            history.push(`/${senderId}/overview`)
        }
    }

    return (
        <Container>
            <ImageContainer imageUrl={photoURL} rel={'noreferer'} />
            <ContentContainer onClick={handleViewNotif}>
                {`${senderName===currentUser.displayName? 'You have ':`${senderName} has `} ${labels[type]}`}
            </ContentContainer>
            <ButtonsContainer >
                {
                    type === 'ADD_REQUEST' ?
                        (
                            <div>
                                <Button type="text" shape="circle" icon={<CheckOutlined style={{ color: 'green' }} />} onClick={handleButtonClick.bind(this, 'confirm')} />
                                <Button type="text" shape="circle" icon={<CloseOutlined style={{ color: 'red' }} />} onClick={handleButtonClick.bind(this, 'reject')} />
                            </div>
                        )
                        :
                        (
                            <Button type="text" shape="circle" icon={<CheckOutlined style={{ color: 'green' }} />} onClick={handleNotifSeen} />
                        )
                }
            </ButtonsContainer>
            <Modal title="Confirm" visible={isConfirmModalShown} onOk={handleAddFriendConfirm} onCancel={handleAddFriendCancel}>
                <p>Are you sure you want to confirm this user? Confirming will allow you both to see each other's progress</p>
            </Modal>
            <Modal title="Reject" visible={isRejectModalShown} onOk={handleRejectRequestConfirm} onCancel={handleRejectRequestCancel}>
                <p>Are you sure you want to reject this request? You will not be able to reverse this unless the request is sent again.</p>
            </Modal>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector
})

const mapDispatchToProps = (dispatch) => ({
    addTeammate: (uid, teammate) => dispatch(addTeammateStart(uid, teammate)),
    removeNotification: (uid, notifID) => dispatch(removeNotificationStart(uid, notifID)),
    sendRequest: (sender, receiverID, requestType) => dispatch(sendRequestStart(sender, receiverID, requestType))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notification))
