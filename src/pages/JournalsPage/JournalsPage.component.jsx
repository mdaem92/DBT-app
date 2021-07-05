import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { isJournalsFetchedSelector, journalsArraySelector, sortedJournalsSelector } from '../../Redux/journals/journals.selectors'
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
    journals: sortedJournalsSelector,
    currentUser: currentUserSelector,
    journalsFetched: isJournalsFetchedSelector
})

const mapDispatchToProps = (dispatch) => ({
    fetchJournals: () => dispatch(fetchJournalsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(JournalsPage)
