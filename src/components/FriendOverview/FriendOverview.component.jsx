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
import { friendOverviewPageViewSelector } from '../../Redux/friendOverviewPage/friendsOverviewPage.selectors'


const FriendOverview = ({ id, showGraph }) => {

    const latestJournals = useFriendJournals(id)
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
            {/* {
                showGraph ?
                    (
                        <ChartsContainer>

                            {!!moodData && <NewResponsiveChart yAxisTitle={'Mood'} xAxisTitle={'Date'} data={moodData} label={'Mood'} domain={[-2, 2]} />}
                            {!!tensionData && <NewResponsiveChart yAxisTitle={'Tension'} xAxisTitle={'Date'} data={tensionData} label={'Tension'} domain={[0, 100]} />}
                        </ChartsContainer>
                    )
                    :
                    (
                        <Container>
                            {
                                latestJournals.map((journal, index) => <Journal key={index} {...journal} />)
                            }
                        </Container>
                    )


            } */}

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
            {/* <Container>
                {
                    latestJournals.map((journal, index) => <Journal key={index} {...journal} />)
                }
            </Container>
            <ChartsContainer>

                {!!moodData && <NewResponsiveChart yAxisTitle={'Mood'} xAxisTitle={'Date'} data={moodData} label={'Mood'} domain={[-2, 2]} />}
                {!!tensionData && <NewResponsiveChart yAxisTitle={'Tension'} xAxisTitle={'Date'} data={tensionData} label={'Tension'} domain={[0, 100]} />}
            </ChartsContainer> */}

        </JournalsPageContainer>

    )
}

const mapStateToProps = createStructuredSelector({
    showGraph: friendOverviewPageViewSelector
})

export default connect(mapStateToProps)(FriendOverview)
