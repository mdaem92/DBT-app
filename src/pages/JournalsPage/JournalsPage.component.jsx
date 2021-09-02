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
import { EmptyScreen } from '../../components/HomepageTabs/HomepageTabs.styles'
import {Button} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'

const JournalsPage = ({ journals, currentUser, journalsFetched, fetchJournals,total ,history }) => {

    useEffect(() => {
        if (!journalsFetched && !!currentUser) {
            fetchJournals(currentUser.uid)
        }
    }, [fetchJournals, journalsFetched, currentUser])
    console.log('current user: ',currentUser);
    const handleCreateFirst = ()=>{
        history.push('/add-journal')

    }
    return (

        <div>
            <JournalsPageContainer>
                <SidePanelProfileContainer>
                    <UserProfile />
                </SidePanelProfileContainer>
                <JournalsContainer>
                    {
                        journals?.length>0 ?
                        journals.map((journal, index) => <Journal {...journal} key={index} />)
                        :
                        (<EmptyScreen>
                            <Button
                                 icon={<PlusOutlined /> }
                                 onClick={handleCreateFirst}
                                 type={'primary'}
                            >
                                Create your first Journal
                            </Button>
                        </EmptyScreen>)
                    }
                </JournalsContainer>
                <PaginationContainer isHidden={journals?.length<=0}>
                    <Pagination  isOwnJournals total={total}/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JournalsPage))
