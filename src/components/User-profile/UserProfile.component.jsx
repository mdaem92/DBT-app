import React, { useState } from 'react'
import { ProfileContainer, ProfileImage, AccountMenu } from './UserProfile.styles'
import useCurrentUser from '../../hooks/useCurrentUser'
import { Menu } from 'antd'
import { LogoutOutlined, SettingFilled, KeyOutlined, TeamOutlined } from '@ant-design/icons'

const UserProfile = () => {
    const { SubMenu } = Menu
    const currentUser = useCurrentUser()
    const [isExtended, setExtended] = useState(false)

    const handleMoveProfileImage = () => {
        setExtended(!isExtended)
    }
    const handleClick = () => {
        console.log('clicking');
    }

    const copyToClipBoard = (e) => {
        const text = e.item.props.children[1][1]
        navigator.clipboard.writeText(text).then(() => {
            console.log('copied to clipboard');
            alert('copied')
        })
    }
    return (
        <ProfileContainer>
            <ProfileImage imageUrl={currentUser?.photoURL} isHidden={isExtended} />
            <AccountMenu
                mode='inline'
                onClick={handleClick}
                style={{ backgroundColor: '#0b355c' }}
            >
                <SubMenu key="settings" icon={<SettingFilled />} title="Account Settings" color={'white'} onTitleClick={handleMoveProfileImage}>
                    <SubMenu key="publicKey" icon={<KeyOutlined />} title={'Public Key'}>
                        <Menu.Item key="1" onClick={copyToClipBoard}>{currentUser?.uid}</Menu.Item>
                    </SubMenu>
                    <SubMenu key="teammates" icon={<TeamOutlined />} title={'View Teammates'}>
                        <Menu.Item key="2">something</Menu.Item>
                    </SubMenu>
                    {/* <Menu.Item key="3">Option 2</Menu.Item> */}
                </SubMenu>
                <Menu.Item key="logout" icon={<LogoutOutlined />} color={'white'}>Log out</Menu.Item>

            </AccountMenu>
        </ProfileContainer>
    )
}

export default UserProfile
