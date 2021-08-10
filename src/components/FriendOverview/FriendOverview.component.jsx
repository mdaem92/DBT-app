import React, { useEffect, useState } from 'react'
import useFriendJournals from '../../hooks/useLatestJournals'
import { JournalsPageContainer, SidePanelProfileContainer ,PaginationContainer  } from '../../pages/JournalsPage/JournalsPage.styles'
import { ChartsContainer } from '../HomepageTabs/HomepageTabs.styles'
import Journal from '../Journal/Journal.component'
import UserProfile from '../User-profile/UserProfile.component'
import { Container } from './FriendOverview.styles'
import NewResponsiveChart from '../Responsive-Chart/ResponsiveChart'
import { getMoodAndTensionData } from './FriendOverview.utils'
import { connect,useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { friendOverviewDateFromSelector, friendOverviewDateToSelector, friendOverviewPageViewSelector } from '../../Redux/friendOverviewPage/friendsOverviewPage.selectors'
import Pagination from '../Pagination/Pagination.component'
import { currentPageSelector, pageSizeSelector } from '../../Redux/pagination/pagination.selectors'

const FriendOverview = ({ id, showGraph , dateFrom,dateTo }) => {

    const currentPage = useSelector((state) => currentPageSelector(state,'friendCurrentPage'))
    const pageSize = useSelector((state)=>pageSizeSelector(state,'friendPageSize'))

    const latestJournals = useFriendJournals(id,dateFrom,dateTo,currentPage,pageSize)
    console.log('received friends latest journals: ', latestJournals);
    const [moodData, setmoodData] = useState([])
    const [tensionData, settensionData] = useState([])


    useEffect(() => {
        const { moodData: mood, tensionData: tension } = getMoodAndTensionData(latestJournals)
        setmoodData(mood)
        settensionData(tension)
    }, [latestJournals])




    return (

        <JournalsPageContainer>
            <SidePanelProfileContainer>
                <UserProfile />
            </SidePanelProfileContainer>

            <Container>
                {
                    showGraph ?
                        (

                            <ChartsContainer>

                                {!!moodData && <NewResponsiveChart yAxisTitle={'Mood'} xAxisTitle={'Date'} data={moodData} label={'Mood'} domain={[-2, 2]} />}
                                {!!tensionData && <NewResponsiveChart yAxisTitle={'Tension'} xAxisTitle={'Date'} data={tensionData} label={'Tension'} domain={[0, 100]} />}
                            </ChartsContainer>
                        )
                        :
                        (
                            latestJournals.map((journal, index) => <Journal key={index} {...journal} />)
                        )
                }
            </Container>
            <PaginationContainer>
                <Pagination total={latestJournals.length}/>
            </PaginationContainer>

        </JournalsPageContainer>

    )
}

const mapStateToProps = createStructuredSelector({
    showGraph: friendOverviewPageViewSelector,
    dateFrom:friendOverviewDateFromSelector,
    dateTo:friendOverviewDateToSelector,

})

export default connect(mapStateToProps)(FriendOverview)
