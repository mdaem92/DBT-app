import React, { useState, useEffect } from 'react'
import { ProfileContainer, ProfileImage, AccountMenu } from './UserProfile.styles'
// import useCurrentUser from '../../hooks/useCurrentUser'
import { Menu, message, Modal, DatePicker,TimePicker } from 'antd'
import { LogoutOutlined, SettingFilled, KeyOutlined, TeamOutlined, PlusOutlined, SlidersOutlined, UserOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { createStructuredSelector } from 'reselect'
import { currentUserSelector } from '../../Redux/user/user.selectors'
import { connect } from 'react-redux'
import { signOutStart } from '../../Redux/user/user.actions'
import UserSearchSelect from '../user-search-select/user-search-select.component'
import { notifErrorSelector } from '../../Redux/notifications/notifications.selectors'
import { resetError } from '../../Redux/notifications/notifications.actions'
import Teammates from '../Teammates/Teammates.component'
import { setFieldValue } from '../../Redux/journals/journals.actions'
import { withRouter } from 'react-router-dom'
import {toggleView} from '../../Redux/friendOverviewPage/friendOverviewPage.actions'
import { friendOverviewPageViewSelector } from '../../Redux/friendOverviewPage/friendsOverviewPage.selectors'
import DeadlineSwitchSetting from '../Deadline-Switch-setting/DeadlineSwitchSetting.component'

const UserProfile = ({ currentUser, logOut, notifError, resetError, setFieldValue, match, showGraph,toggleView }) => {
    const { SubMenu } = Menu
    const [isExtended, setExtended] = useState(false)


    const handleMoveProfileImage = () => {
        setExtended(!isExtended)
    }


    const copyToClipBoard = (e) => {
        const text = e.item.props.children[1]
        navigator.clipboard.writeText(text).then(() => {
            message.success('key copied to clipboard', 2)
        })
    }

    useEffect(() => {
        const clearError = () => {
            resetError()
        }
        if (!!notifError) {
            Modal.error({
                title: 'Error finding user',
                content: 'The user with the given public key does not exist',
                onOk: clearError

            })
        }
    }, [notifError, resetError])

    const handleDateChange = (fieldName, date) => {
        setFieldValue(fieldName, date)
    }

    const handleToggleFriendView = ()=>{
        toggleView()
    }

    

    return (
        <div>
            <ProfileContainer>
                <ProfileImage imageUrl={currentUser?.photoURL} isHidden={isExtended} referrerpolicy="no-referrer" />
                <AccountMenu
                    mode='inline'
                    style={{ backgroundColor: '#0b355c' }}
                >
                    <SubMenu key="settings" icon={<SettingFilled />} title="Account Settings" color={'white'} onTitleClick={handleMoveProfileImage}>
                        <SubMenu key="publicKey" icon={<KeyOutlined />} title={'Public Key'}>
                            <Menu.Item key="1" onClick={copyToClipBoard}>{currentUser?.uid}</Menu.Item>
                        </SubMenu>
                        <SubMenu key="teammates" icon={<TeamOutlined />} title={'View Teammates'}>
                            <Teammates />
                        </SubMenu>
                        <SubMenu key="addNew" icon={<PlusOutlined />} title={'Add teammate'}>
                            <UserSearchSelect />
                        </SubMenu>
                        <SubMenu key="myDeadlines" icon={<FieldTimeOutlined />} title={'My Deadlines'}>
                            {/* deadlines go here */}
                            <DeadlineSwitchSetting/>
                            {/* TODO add deadline viewer and time picker */}
                        </SubMenu>
                    </SubMenu>
                    {
                        match.path === '/:uid/overview' &&
                        <Menu.Item key='friendOverviewTab' icon={<UserOutlined/> } onClick={handleToggleFriendView}>
                            View friend's {showGraph ? 'Journals':'Data graph'}
                        </Menu.Item>

                    }
                    <SubMenu key='filters' icon={<SlidersOutlined />} title={'Filter Journals'} color={'white'} onTitleClick={handleMoveProfileImage}>
                        <Menu.Item key='dateFrom'>
                            <DatePicker placeholder={'Date From'} onChange={handleDateChange.bind(this, 'dateFrom')} />
                        </Menu.Item>
                        <Menu.Item key='dateTo'>
                            <DatePicker placeholder={'Date To'} onChange={handleDateChange.bind(this, 'dateTo')} />
                        </Menu.Item>
                        {/* <Menu.Item key='dateRange' onClick={()=>console.log('clicking')}>
                            <RangePicker/> 
                        </Menu.Item> */}
                    </SubMenu>
                    <Menu.Item
                        key="logout"
                        icon={<LogoutOutlined />}
                        onClick={logOut}
                        color={'white'}
                    >
                        Log out
                    </Menu.Item>

                </AccountMenu>
            </ProfileContainer>
            {/* <Modal title="Error" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} afterClose={clearError}>{notifError}</Modal> */}

        </div>

    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector,
    notifError: notifErrorSelector,
    showGraph:friendOverviewPageViewSelector
})

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(signOutStart()),
    resetError: () => dispatch(resetError()),
    setFieldValue: (name, value) => dispatch(setFieldValue(name, value)),
    toggleView:()=>dispatch(toggleView())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile))
