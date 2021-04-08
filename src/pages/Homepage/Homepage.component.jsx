import React, { useEffect } from 'react'
import {Container, DateAndTimeContainer, TabsContainer, UserNameAvgsContainer } from './Homepage.styles'
import UserNameAvgs from '../../components/Username-averages/UserNameAvgs.component'
import DateAndTime from '../../components/Date-Time/DateAndTime.component'
import HomepageTabs from '../../components/HomepageTabs/HomepageTabs.component'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fetchJournalsStart } from '../../Redux/journals/journals.actions'
import { isJournalsFetchedSelector } from '../../Redux/journals/journals.selectors'
import useCurrentUser from '../../hooks/useCurrentUser'
import TestComponent, { Page, WelcomeTitle } from '../../playground/TestComponent.component'
import { currentUserSelector } from '../../Redux/user/user.selectors'

const Homepage = ({ fetchJournals, isJournalsFetched , currentUser }) => {

    // const currentUser = useCurrentUser()
    useEffect(() => {

        if (!isJournalsFetched && !!currentUser) {
            console.log(`journals are not fetched: `,isJournalsFetched);
            fetchJournals(currentUser.uid)
        }
    }, [isJournalsFetched,fetchJournals,currentUser])
    

    return (
        
        <Container>
            <UserNameAvgsContainer>
                <UserNameAvgs />
            </UserNameAvgsContainer>
            <DateAndTimeContainer>
                <DateAndTime />
            </DateAndTimeContainer>
            <TabsContainer>
                <HomepageTabs />
            </TabsContainer>
        </Container>
        // <div>
        //     <WelcomeTitle primary/>
        // </div>

    )
}

const mapStateToprops = createStructuredSelector({
    isJournalsFetched: isJournalsFetchedSelector,
    currentUser:currentUserSelector
})

const mapDispatchToProps = (dispatch) => ({
    fetchJournals: (uid) => dispatch(fetchJournalsStart(uid))
})

export default connect(mapStateToprops, mapDispatchToProps)(Homepage)
