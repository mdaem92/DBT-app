import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { filteredSortedJournalsSelector, isJournalsFetchedSelector, journalsArraySelector, sortedJournalsSelector } from '../../Redux/journals/journals.selectors'
import Journal from '../../components/Journal/Journal.component'
import { JournalsContainer, JournalsPageContainer, SidePanelProfileContainer } from './JournalsPage.styles'
import UserProfile from '../../components/User-profile/UserProfile.component'
import { currentUserSelector } from '../../Redux/user/user.selectors'
import { fetchJournalsStart } from '../../Redux/journals/journals.actions'

const JournalsPage = ({ journals, currentUser, journalsFetched, fetchJournals }) => {

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


            </JournalsPageContainer>

        </div>

    )
}

const mapStateToProps = createStructuredSelector({
    journals: filteredSortedJournalsSelector,
    currentUser: currentUserSelector,
    journalsFetched: isJournalsFetchedSelector
})

const mapDispatchToProps = (dispatch) => ({
    fetchJournals: (uid) => dispatch(fetchJournalsStart(uid))
})

export default connect(mapStateToProps, mapDispatchToProps)(JournalsPage)
