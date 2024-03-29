import React, { useEffect, useState } from 'react'
import useFriendJournals from '../../hooks/useLatestJournals'
import { JournalsPageContainer, SidePanelProfileContainer, PaginationContainer } from '../../pages/JournalsPage/JournalsPage.styles'
import { ChartsContainer } from '../HomepageTabs/HomepageTabs.styles'
import Journal from '../Journal/Journal.component'
import UserProfile from '../User-profile/UserProfile.component'
import { Container, EmptyContainer } from './FriendOverview.styles'
import NewResponsiveChart from '../Responsive-Chart/ResponsiveChart'
import { getMoodData, getTensionData } from './FriendOverview.utils'
import { connect, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { friendOverviewDateFromSelector, friendOverviewDateToSelector, friendOverviewPageViewSelector } from '../../Redux/friendOverviewPage/friendsOverviewPage.selectors'
import Pagination from '../Pagination/Pagination.component'
import { currentPageSelector, pageSizeSelector } from '../../Redux/pagination/pagination.selectors'
import { ChartPagination } from '../Chart-Pagination/Chart-pagination.component'

const FriendOverview = ({ id, showGraph, dateFrom, dateTo , name }) => {

    const currentPage = useSelector((state) => currentPageSelector(state, 'friendCurrentPage'))
    const pageSize = useSelector((state) => pageSizeSelector(state, 'friendPageSize'))

    const paginatedLatestJournals = useFriendJournals(id, dateFrom, dateTo, currentPage, pageSize)
    console.log('received friends latest journals: ', paginatedLatestJournals);
    const [moodData, setmoodData] = useState([])
    const [tensionData, settensionData] = useState([])
    const [entriesPerChart, setEntriesPerChart] = useState(7)
    const chartJournals = useFriendJournals(id, undefined, undefined, undefined, undefined, entriesPerChart)



    useEffect(() => {
        // const { moodData: mood, tensionData: tension } = getMoodAndTensionData(chartJournals)

        const mood = getMoodData(chartJournals)
        const tension = getTensionData(chartJournals)
        setmoodData(mood)
        settensionData(tension)
    }, [chartJournals])


    console.log('paginated data: ', chartJournals);

    return (

        <JournalsPageContainer>
            <SidePanelProfileContainer>
                <UserProfile />
            </SidePanelProfileContainer>

            {
                chartJournals?.length>0?
                (
                <Container>
                    {
                        showGraph ?
                            (
                                <div>
                                    <ChartPagination entriesPerChart={entriesPerChart} setEntriesPerChart={setEntriesPerChart} />
                                    <ChartsContainer>

                                        {!!moodData && <NewResponsiveChart yAxisTitle={'Mood'} xAxisTitle={'Date'} data={moodData} label={'Mood'} domain={[1, 9]} isFriendsView/>}
                                        {!!tensionData && <NewResponsiveChart yAxisTitle={'Tension'} xAxisTitle={'Date'} data={tensionData} label={'Tension'} domain={[0, 100]} isFriendsView/>}
                                    </ChartsContainer>
                                </div>

                            )
                            :
                            (
                                paginatedLatestJournals.map((journal, index) => <Journal key={index} {...journal} />)
                            )
                    }
                </Container>
                )
                :
                (
                    <EmptyContainer>{name} has not made any journals yet</EmptyContainer>
                )
            }
            {
                !showGraph && chartJournals?.length>0 &&
                <PaginationContainer>
                    <Pagination total={paginatedLatestJournals.length} />
                </PaginationContainer>
            }

        </JournalsPageContainer>

    )
}

const mapStateToProps = createStructuredSelector({
    showGraph: friendOverviewPageViewSelector,
    dateFrom: friendOverviewDateFromSelector,
    dateTo: friendOverviewDateToSelector,


})

export default connect(mapStateToProps)(FriendOverview)
