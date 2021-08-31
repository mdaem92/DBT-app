import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import {  isJournalsFetchedSelector, journalsTotalCountSelector, paginatedFilteredSortedJournalsSelector } from '../../Redux/journals/journals.selectors'
import Journal from '../../components/Journal/Journal.component'
import { JournalsContainer, JournalsPageContainer, SidePanelProfileContainer , PaginationContainer } from './JournalsPage.styles'
import UserProfile from '../../components/User-profile/UserProfile.component'
import { currentUserSelector } from '../../Redux/user/user.selectors'
import { fetchJournalsStart } from '../../Redux/journals/journals.actions'
import Pagination from '../../components/Pagination/Pagination.component'

const JournalsPage = ({ journals, currentUser, journalsFetched, fetchJournals,total }) => {

    useEffect(() => {
        if (!journalsFetched && !!currentUser) {
            fetchJournals(currentUser.uid)
        }
    }, [fetchJournals, journalsFetched, currentUser])
    console.log('current user: ',currentUser);

    return (

        <div>
            <JournalsPageContainer>
                <SidePanelProfileContainer>
                    <UserProfile />
                </SidePanelProfileContainer>
                <JournalsContainer>
                    {
                        journals.map((journal, index) => <Journal {...journal} key={index} />)
                    }
                </JournalsContainer>
                <PaginationContainer>
                    <Pagination isOwnJournals total={total}/>
                </PaginationContainer>
                {/* <Pagination/> */}



            </JournalsPageContainer>

        </div>

    )
}

const mapStateToProps = createStructuredSelector({
    journals: paginatedFilteredSortedJournalsSelector,
    currentUser: currentUserSelector,
    journalsFetched: isJournalsFetchedSelector,
    total:journalsTotalCountSelector

})

const mapDispatchToProps = (dispatch) => ({
    fetchJournals: (uid) => dispatch(fetchJournalsStart(uid))
})

export default connect(mapStateToProps, mapDispatchToProps)(JournalsPage)
