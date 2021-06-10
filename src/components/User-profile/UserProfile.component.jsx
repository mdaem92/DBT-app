import React, { useState,useEffect } from 'react'
import { ProfileContainer, ProfileImage, AccountMenu } from './UserProfile.styles'
// import useCurrentUser from '../../hooks/useCurrentUser'
import { Menu, message, Modal } from 'antd'
import { LogoutOutlined, SettingFilled, KeyOutlined, TeamOutlined, PlusOutlined } from '@ant-design/icons'
import { createStructuredSelector } from 'reselect'
import { currentUserSelector } from '../../Redux/user/user.selectors'
import { connect } from 'react-redux'
import { signOutStart } from '../../Redux/user/user.actions'
import UserSearchSelect from '../user-search-select/user-search-select.component'
import { membersListSelector } from '../../Redux/members/members.selectors'
import { notifErrorSelector } from '../../Redux/notifications/notifications.selectors'
import { resetError } from '../../Redux/notifications/notifications.actions'
import Teammates from '../Teammates/Teammates.component'


const UserProfile = ({ currentUser, logOut, notifError, resetError }) => {
    const { SubMenu } = Menu
    // const currentUser = useCurrentUser()
    const [isExtended, setExtended] = useState(false)

    const handleMoveProfileImage = () => {
        setExtended(!isExtended)
    }


    const copyToClipBoard = (e) => {
        const text = e.item.props.children[1]
        navigator.clipboard.writeText(text).then(() => {
            // console.log('copied to clipboard');
            message.success('key copied to clipboard', 2)
        })
    }

    

    useEffect(() => {
        // setIsModalVisible(!!notifError)
        const clearError = () => {
            resetError()
        }
        if(!!notifError){
            Modal.error({
                title:'Error finding user',
                content:'The user with the given public key does not exist',
                onOk:clearError
                
            })
        }
       

    }, [notifError,resetError])

    return (
        <div>
            <ProfileContainer>
                <ProfileImage imageUrl={currentUser?.photoURL} isHidden={isExtended} referrerpolicy="no-referrer" />
                <AccountMenu
                    mode='inline'
                    // onClick={handleClick}
                    style={{ backgroundColor: '#0b355c' }}
                >
                    <SubMenu key="settings" icon={<SettingFilled />} title="Account Settings" color={'white'} onTitleClick={handleMoveProfileImage}>
                        <SubMenu key="publicKey" icon={<KeyOutlined />} title={'Public Key'}>
                            <Menu.Item key="1" onClick={copyToClipBoard}>{currentUser?.uid}</Menu.Item>
                        </SubMenu>
                        <SubMenu key="teammates" icon={<TeamOutlined />} title={'View Teammates'}>
                            {/* <Menu.Item onClick={()=>console.log('clicking teammate')} key="2">something</Menu.Item> */}
                            {/* TODO crete teammates list  */}
                            <Teammates/>
                        </SubMenu>
                        <SubMenu key="addNew" icon={<PlusOutlined />} title={'Add teammate'}>
                            <UserSearchSelect />
                        </SubMenu>
                        {/* <Menu.Item key="3">Option 2</Menu.Item> */}
                    </SubMenu>
                    <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logOut} color={'white'}>Log out</Menu.Item>

                </AccountMenu>
            </ProfileContainer>
            {/* <Modal title="Error" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} afterClose={clearError}>{notifError}</Modal> */}

        </div>

    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector,
    notifError: notifErrorSelector
})

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(signOutStart()),
    resetError: () => dispatch(resetError())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
