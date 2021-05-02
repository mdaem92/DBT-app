import React,{useEffect} from 'react'
import { Container } from './Notifications.styles'
import { Menu, Dropdown ,Badge } from 'antd'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { notificationsSelector } from '../../Redux/notifications/notifications.selectors'
import { BellOutlined } from '@ant-design/icons'
import Notification from '../Notification/Notification.component'
import { setCurrentNotifications } from '../../Redux/notifications/notifications.actions'
import useLatestNotifications from '../../hooks/useLatestNotifications'
import { currentUserSelector } from '../../Redux/user/user.selectors'

const Notifications = ({ currentNotifications,setCurrentNotifications,currentUser }) => {
    const latestNotifications = useLatestNotifications(currentUser.uid)
    console.log("current notifs: ", currentNotifications);
    console.log("latest notifs: ", latestNotifications);

    
    useEffect(() => {

        if (!_.isEqual(latestNotifications,currentNotifications)) {
            console.log('difference in notifications');
            const intersection = latestNotifications.filter((element,index) => !_.isEqual(element,currentNotifications[index]));
            console.log("intersection: ",intersection);
            setCurrentNotifications(intersection)
        }
    },[setCurrentNotifications,currentNotifications,latestNotifications])

    const menu = (
        <Menu>
            {
                currentNotifications.map((notification,index) =>
                    <Menu.Item key={index}>
                        <Notification {...notification}/>
                    </Menu.Item>
                )
            }
            <Menu.Item key="-1" disabled>
                3rd menu item（disabled）
            </Menu.Item>
        </Menu>
    );

    return (
        <Container>
            <Dropdown overlay={menu}>
                <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <BellOutlined />
                    {currentNotifications.length>0 && <Badge count={currentNotifications.length} offset={[0,-10]} size={'small'}/>}
                </div>
            </Dropdown>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    currentNotifications: notificationsSelector,
    currentUser:currentUserSelector
})
const mapDispatchToProps = (dispatch) => ({
    // clearNotifications: () => dispatch(clearNotifications())
    setCurrentNotifications:(notifs)=>dispatch(setCurrentNotifications(notifs))
})
export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
