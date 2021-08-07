import React from 'react'
import { Menu, Dropdown, Badge } from 'antd'
import { NavLink, Link } from 'react-router-dom'
import useWindowSize from '../../hooks/useWindowSize'
import { HeaderContainer, IconContainer, MobileTopBarContainer, NavContainer } from './Header.styles'
import { MenuOutlined } from '@ant-design/icons'
import Notifications from '../Notifications/Notifications.component'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { currentUserSelector } from '../../Redux/user/user.selectors'

const Header = ({ currentUser }) => {
    const width = useWindowSize()

    const menu = (
        <Menu>
            <Menu.Item >
                <NavLink exact activeClassName={'active'} className={'anchor'} to='/'>Homepage</NavLink>
            </Menu.Item>
            <Menu.Item >
                <NavLink exact activeClassName={'active'} className={'anchor'} to='/journals'>Journals</NavLink>
            </Menu.Item>
            <Menu.Item >
                <NavLink exact activeClassName={'active'} className={'anchor'} to='/add-journal'>Add Journal</NavLink>
            </Menu.Item>
        </Menu>
    )
    return (
        <HeaderContainer id={'header-container'}>
            <IconContainer>
                DBT
            </IconContainer>
            {
                width > 800 ?

                    <NavContainer>
                        <NavLink exact activeClassName={'active'} className={'anchor'} to='/'>Homepage</NavLink>
                        <NavLink exact activeClassName={'active'} className={'anchor'} to='/journals'>Journals</NavLink>
                        <NavLink exact activeClassName={'active'} className={'anchor'} to='/add-journal'>Add Journal</NavLink>
                        {!!currentUser && <Notifications />}
                    </NavContainer>

                    :
                    <MobileTopBarContainer>
                        {!!currentUser && <Notifications />}
                        <Dropdown
                            overlay={menu}
                            placement="bottomCenter"
                            trigger={['click']}
                            overlayClassName={'dropdown-overlay'}
                            getPopupContainer={() => document.getElementById('header-container')}
                            className={'dropdown'}
                        >
                            <MenuOutlined />
                        </Dropdown>
                    </MobileTopBarContainer>



            }
        </HeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector
})

export default connect(mapStateToProps)(Header)
