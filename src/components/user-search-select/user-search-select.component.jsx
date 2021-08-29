import React, { useState, useEffect } from 'react'
import { Select ,Input  } from 'antd'
import { Container } from './user-search-select.styles'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { sendRequestStart } from '../../Redux/notifications/notifications.actions'
import { PlusOutlined } from '@ant-design/icons'
import { currentUserSelector } from '../../Redux/user/user.selectors'
import {notifErrorSelector, notificationLoadingSelector} from '../../Redux/notifications/notifications.selectors'

const UserSearchSelect = ({ sendRequest, members ,currentUser ,isNotifLoading , notifError }) => {

    const {Search} = Input

    const handleChange = ({target:{value}}) => {
        console.log(value);
    }


    const handleSendRequest = (value)=>{
        console.log('sending request',value);
        sendRequest(currentUser,value,'ADD_REQUEST')
        
        
    }


    return (
        <Container>
            <Search 
                placeholder="Enter public key" 
                enterButton={<PlusOutlined/>}
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
    currentUser:currentUserSelector,
    isNotifLoading: notificationLoadingSelector,
    notifError:notifErrorSelector
})

const mapDispatchToProps = (dispatch) => ({
    sendRequest: (sender,receiverId,requestType) => dispatch(sendRequestStart(sender,receiverId,requestType))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchSelect)
