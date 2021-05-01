import React, { useEffect } from 'react'
import {Container, DateAndTimeContainer, TabsContainer, UserNameAvgsContainer } from './Homepage.styles'
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
import { firestore } from '../../firebase/firebase.utils'
import { isNotificationsFetchedSelector, notificationsSelector } from '../../Redux/notifications/notifications.selectors'
import { fetchNotificationsStart } from '../../Redux/notifications/notifications.actions'

const Homepage = ({ fetchJournals, isJournalsFetched , currentUser , isMembersFetched , fetchMembers , isNotificationsFetched , fetchNotifications,notifications:currentNotifications }) => {

    useLatestNotifications(currentUser.uid)
    console.log("current notifs: ",currentNotifications);
    useEffect(() => {

        if (!isJournalsFetched && !!currentUser) {
            console.log(`journals are not fetched: `,isJournalsFetched);
            fetchJournals(currentUser.uid)
        }
    }, [isJournalsFetched,fetchJournals,currentUser])

    // useEffect(()=>{
    //     if(!isMembersFetched ){
    //         console.log('members are not fetched ',isMembersFetched);
    //         fetchMembers()
    //     }

    // },[isMembersFetched,fetchMembers])

    useEffect(()=>{
        if(!isNotificationsFetched){
            fetchNotifications(currentUser.uid)
        }    
    },[isNotificationsFetched,fetchNotifications,currentUser])

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
    currentUser:currentUserSelector,
    isMembersFetched:isMembersFetchedSelector,
    isNotificationsFetched:isNotificationsFetchedSelector,
    notifications:notificationsSelector

})

const mapDispatchToProps = (dispatch) => ({
    fetchJournals: (uid) => dispatch(fetchJournalsStart(uid)),
    fetchMembers:()=>dispatch(fetchMembersStart()),
    fetchNotifications:(uid)=>dispatch(fetchNotificationsStart(uid))
})

export default connect(mapStateToprops, mapDispatchToProps)(Homepage)
