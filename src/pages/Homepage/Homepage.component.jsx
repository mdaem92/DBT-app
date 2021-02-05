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

const Homepage = ({ fetchJournals, isJournalsFetched }) => {

    const currentUser = useCurrentUser()
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

    )
}

const mapStateToprops = createStructuredSelector({
    isJournalsFetched: isJournalsFetchedSelector
})

const mapDispatchToProps = (dispatch) => ({
    fetchJournals: (uid) => dispatch(fetchJournalsStart(uid))
})

export default connect(mapStateToprops, mapDispatchToProps)(Homepage)
