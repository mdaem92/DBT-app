import React, { useState } from 'react'
import { ProfileContainer, ProfileImage, AccountMenu } from './UserProfile.styles'
// import useCurrentUser from '../../hooks/useCurrentUser'
import { Menu, message } from 'antd'
import { LogoutOutlined, SettingFilled, KeyOutlined, TeamOutlined , PlusOutlined } from '@ant-design/icons'
import { createStructuredSelector } from 'reselect'
import { currentUserSelector } from '../../Redux/user/user.selectors'
import { connect } from 'react-redux'
import { signOutStart } from '../../Redux/user/user.actions'
import UserSearchSelect from '../user-search-select/user-search-select.component'
import { membersListSelector } from '../../Redux/members/members.selectors'

const UserProfile = ({ currentUser, logOut }) => {
    const { SubMenu } = Menu
    // const currentUser = useCurrentUser()
    const [isExtended, setExtended] = useState(false)

    const handleMoveProfileImage = () => {
        setExtended(!isExtended)
    }


    const copyToClipBoard = (e) => {
        const text = e.item.props.children[1]
        // console.log(e.item.props.children[1]);
        navigator.clipboard.writeText(text).then(() => {
            console.log('copied to clipboard');
            message.success('key copied to clipboard',2)
        })
    }
    return (
        <div>
            <ProfileContainer>
                <ProfileImage imageUrl={currentUser?.photoURL} isHidden={isExtended} />
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
                            <Menu.Item key="2">something</Menu.Item>
                        </SubMenu>
                        <SubMenu key="addNew" icon={<PlusOutlined />} title={'Add teammate'}>
                            <UserSearchSelect/>
                        </SubMenu>
                        {/* <Menu.Item key="3">Option 2</Menu.Item> */}
                    </SubMenu>
                    <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logOut} color={'white'}>Log out</Menu.Item>

                </AccountMenu>
            </ProfileContainer>

        </div>

    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector
})

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
