import { connect } from 'react-redux'
import React from 'react'
import { createStructuredSelector } from 'reselect'
import { journalsArraySelector } from '../../Redux/journals/journals.selectors'
import Journal from '../../components/Journal/Journal.component'
import { JournalsContainer, JournalsPageContainer, SidePanelContainer ,SidePanelProfileContainer } from './JournalsPage.styles'
import { Menu } from 'antd'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import UserProfile from '../../components/User-profile/UserProfile.component'
import { currentUserSelector } from '../../Redux/user/user.selectors'

const { SubMenu } = Menu
const JournalsPage = ({ journals , currentUser }) => {

    const handleClick = () => {
        console.log('clicking');
    }
    return (

        <div>
            <JournalsPageContainer>
                <SidePanelProfileContainer>
                    <UserProfile/>
                    {/* <SidePanelContainer
                        mode='inline'
                        onClick={handleClick}
                        style={{ backgroundColor: '#0b355c' }}
                    >

                        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                            <Menu.ItemGroup key="g1" title="Item 1">
                                <Menu.Item key="1">Option 1</Menu.Item>
                                <Menu.Item key="2">Option 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="Item 2">
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SidePanelContainer> */}
                </SidePanelProfileContainer>


                <JournalsContainer>
                    {
                        journals.map((journal, index) => <Journal {...journal} key={index} />)
                    }
                </JournalsContainer>


            </JournalsPageContainer>

        </div>

    )
}

const mapStateToProps = createStructuredSelector({
    journals: journalsArraySelector,
    currentUser:currentUserSelector
})

export default connect(mapStateToProps)(JournalsPage)
