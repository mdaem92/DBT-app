import React, { useEffect } from 'react'
import { Input } from 'antd'
import { Container } from './user-search-select.styles'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { resetError, sendRequestStart } from '../../Redux/notifications/notifications.actions'
import { PlusOutlined } from '@ant-design/icons'
import { currentUserSelector } from '../../Redux/user/user.selectors'
import { notifErrorSelector, notificationLoadingSelector } from '../../Redux/notifications/notifications.selectors'
import { Modal } from 'antd'

const UserSearchSelect = ({ sendRequest, members, currentUser, isNotifLoading, notifError, resetError }) => {

    const { Search } = Input

    const handleChange = ({ target: { value } }) => {
        // console.log(value);
    }

    // const handleOk = () => {
    //     // setsubmitPressed(false)
    //     console.log('done');
    //     // setsubmitted(false)

    // }

    // const [submitted, setsubmitted] = useState(false)
    useEffect(() => {
        const clearError = () => {
            resetError()
        }
        if (!!notifError) {
            Modal.error({
                title: 'Error sending friend request',
                content: notifError,
                onOk: clearError

            })
        } 
    }, [notifError, resetError])


    const handleSendRequest = (value) => {
        console.log('sending request', value);
        sendRequest(currentUser, value, 'ADD_REQUEST')
        // setsubmitted(true)

        // if(typeof notifError==='undefined'){
        //     console.log('current notif error: ',notifError);
        //     // sendRequest(currentUser,value,'ADD_REQUEST')
        //     Modal.info({
        //         title: 'Success',
        //         content: 'Request successfully sent',
        //         onOk: handleOk

        //     })

        // }


    }


    return (
        <Container>
            <Search
                placeholder="Enter public key"
                enterButton={<PlusOutlined />}
                onChange={handleChange}
                size="medium"
                loading={isNotifLoading}
                onSearch={handleSendRequest}
                bordered={false}

            />

        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    // members: membersListSelector,
    // isRequestPending:isRequestPendingSelector,
    currentUser: currentUserSelector,
    isNotifLoading: notificationLoadingSelector,
    notifError: notifErrorSelector,

})

const mapDispatchToProps = (dispatch) => ({
    sendRequest: (sender, receiverId, requestType) => dispatch(sendRequestStart(sender, receiverId, requestType)),
    resetError: () => dispatch(resetError())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchSelect)
