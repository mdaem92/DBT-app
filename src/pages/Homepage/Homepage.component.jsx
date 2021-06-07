import React, { useEffect } from 'react'
import { Container, DateAndTimeContainer, TabsContainer, UserNameAvgsContainer } from './Homepage.styles'
import UserNameAvgs from '../../components/Username-averages/UserNameAvgs.component'
import DateAndTime from '../../components/Date-Time/DateAndTime.component'
import HomepageTabs from '../../components/HomepageTabs/HomepageTabs.component'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fetchJournalsStart } from '../../Redux/journals/journals.actions'
import { isJournalsFetchedSelector } from '../../Redux/journals/journals.selectors'
import { currentUserSelector } from '../../Redux/user/user.selectors'
import { isMembersFetchedSelector } from '../../Redux/members/members.selectors'
import { fetchMembersStart } from '../../Redux/members/members.actions'
import useLatestNotifications from '../../hooks/useLatestNotifications'
import { isNotificationsFetchedSelector, notificationsSelector } from '../../Redux/notifications/notifications.selectors'
import { fetchNotificationsStart, setCurrentNotifications } from '../../Redux/notifications/notifications.actions'
import _ from 'lodash'

const Homepage = ({
    fetchJournals,
    isJournalsFetched,
    currentUser,
    isMembersFetched,
    fetchMembers,
    isNotificationsFetched,
    fetchNotifications,
    notifications: currentNotifications,
    setCurrentNotifications
}) => {

    // const latestNotifications = useLatestNotifications(currentUser.uid)
    // console.log("current notifs: ", currentNotifications);
    // console.log("latest notifs: ", latestNotifications);

    
    // useEffect(() => {

    //     if (!_.isEqual(latestNotifications,currentNotifications)) {
    //         console.log('difference in notifications');
    //         const intersection = latestNotifications.filter((element,index) => !_.isEqual(element,currentNotifications[index]));
    //         console.log("intersection: ",intersection);
    //         setCurrentNotifications(intersection)
    //     }
    // },[setCurrentNotifications,currentNotifications,latestNotifications])

    useEffect(() => {

        if (!isJournalsFetched && !!currentUser) {
            console.log(`journals are not fetched: `, isJournalsFetched);
            fetchJournals(currentUser.uid)
        }
    }, [isJournalsFetched, fetchJournals, currentUser])

    // useEffect(()=>{
    //     if(!isMembersFetched ){
    //         console.log('members are not fetched ',isMembersFetched);
    //         fetchMembers()
    //     }

    // },[isMembersFetched,fetchMembers])

    useEffect(() => {
        if (!isNotificationsFetched && !!currentUser) {
            fetchNotifications(currentUser.uid)
        }
    }, [isNotificationsFetched, fetchNotifications, currentUser])

    return (

        <Container>
            <UserNameAvgsContainer>
                <UserNameAvgs />
            </UserNameAvgsContainer>
            <DateAndTimeContainer>
                <DateAndTime />
            </DateAndTimeContainer>
            {/* <div>{notifications}</div> */}
            <TabsContainer>
                <HomepageTabs />
            </TabsContainer>
        </Container>


    )
}

const mapStateToprops = createStructuredSelector({
    isJournalsFetched: isJournalsFetchedSelector,
    currentUser: currentUserSelector,
    isMembersFetched: isMembersFetchedSelector,
    isNotificationsFetched: isNotificationsFetchedSelector,
    notifications: notificationsSelector

})

const mapDispatchToProps = (dispatch) => ({
    fetchJournals: (uid) => dispatch(fetchJournalsStart(uid)),
    // fetchMembers: () => dispatch(fetchMembersStart()),
    fetchNotifications: (uid) => dispatch(fetchNotificationsStart(uid)),
    setCurrentNotifications: (newNotifications) => dispatch(setCurrentNotifications(newNotifications)),
})

export default connect(mapStateToprops, mapDispatchToProps)(Homepage)
