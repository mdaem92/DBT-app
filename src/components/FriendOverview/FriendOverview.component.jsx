import React, { useEffect, useState } from 'react'
import useFriendJournals from '../../hooks/useLatestJournals'
import { JournalsPageContainer, SidePanelProfileContainer } from '../../pages/JournalsPage/JournalsPage.styles'
import { ChartsContainer } from '../HomepageTabs/HomepageTabs.styles'
import Journal from '../Journal/Journal.component'
import UserProfile from '../User-profile/UserProfile.component'
import { Container } from './FriendOverview.styles'
import NewResponsiveChart from '../Responsive-Chart/ResponsiveChart'
import { getMoodAndTensionData } from './FriendOverview.utils'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { friendOverviewDateFromSelector, friendOverviewDateToSelector, friendOverviewPageViewSelector } from '../../Redux/friendOverviewPage/friendsOverviewPage.selectors'


const FriendOverview = ({ id, showGraph , dateFrom,dateTo }) => {

    const latestJournals = useFriendJournals(id,dateFrom,dateTo)
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

        </JournalsPageContainer>

    )
}

const mapStateToProps = createStructuredSelector({
    showGraph: friendOverviewPageViewSelector,
    dateFrom:friendOverviewDateFromSelector,
    dateTo:friendOverviewDateToSelector
})

export default connect(mapStateToProps)(FriendOverview)
