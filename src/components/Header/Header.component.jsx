import React from 'react'
import { Menu, Dropdown, Badge } from 'antd'
import { NavLink, Link } from 'react-router-dom'
import useWindowSize from '../../hooks/useWindowSize'
import { HeaderContainer, IconContainer ,NavContainer } from './Header.styles'
import {MenuOutlined} from '@ant-design/icons'

const Header = () => {
    const width = useWindowSize()

    const menu = (
        <Menu>
            <Menu.Item >
                <NavLink exact activeClassName={'active'} className={'anchor'} to='/'>Homepage</NavLink>
            </Menu.Item>
            {/* <Menu.Item >
                <NavLink exact activeClassName={'active'} className={'anchor'} to='/charts'>Charts</NavLink>
            </Menu.Item> */}
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
                            {/* <NavLink exact activeClassName={'active'} className={'anchor'} to='/charts'>Charts</NavLink> */}
                            <NavLink exact activeClassName={'active'} className={'anchor'} to='/add-journal'>Add Journal</NavLink>

                        </NavContainer>
                    
                    :
                    
                        <Dropdown
                            overlay={menu}
                            placement="bottomCenter"
                            trigger={['click']}
                            overlayClassName={'dropdown-overlay'}
                            getPopupContainer={() => document.getElementById('header-container')}
                            className={'dropdown'}
                        >
                            <MenuOutlined/>
                        </Dropdown>
                        
                    
            }
        </HeaderContainer>
    )
}

export default Header
