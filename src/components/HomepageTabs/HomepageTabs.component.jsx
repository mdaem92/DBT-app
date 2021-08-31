import React from 'react'
import { Tabs } from 'antd'
import { TabPaneContainer, ChartsContainer } from './HomepageTabs.styles'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { moodsSelector, paginatedMoodsSelector, paginatedTensionsSelector, tensionsSelector } from '../../Redux/journals/journals.selectors'
import NewResponsiveChart from '../Responsive-Chart/ResponsiveChart'
import ChartPagination from '../Chart-Pagination/Chart-pagination.component'

const { TabPane } = Tabs

const HomepageTabs = ({ moodData, tensionData }) => {   



    console.log("mood data \n",moodData);
    return (
        // <Tabs defaultActiveKey="1" onChange={handleChange}>
        //     <TabPaneContainer tab={'My Stats'} key="1">
        //         <ChartPagination />
        //         <ChartsContainer>
        //             <NewResponsiveChart yAxisTitle={'Mood'} xAxisTitle={'Date'} data={moodData} label={'Mood'} domain={[-2, 2]} />
        //             <NewResponsiveChart yAxisTitle={'Tension'} xAxisTitle={'Date'} data={tensionData} label={'Tension'} domain={[0, 100]} />
        //         </ChartsContainer>
        //     </TabPaneContainer>
        //     <TabPaneContainer tab={'Teammate\'s'} key="2">
        //         teammate's stats
        //     </TabPaneContainer>
        // </Tabs>
        <div>
            <ChartPagination />
            <ChartsContainer homepage>
                <NewResponsiveChart yAxisTitle={'Mood'} xAxisTitle={'Date'} data={moodData} label={'Mood'} domain={[-2, 2]} />
                <NewResponsiveChart yAxisTitle={'Tension'} xAxisTitle={'Date'} data={tensionData} label={'Tension'} domain={[0, 100]} />
            </ChartsContainer>
        </div>

    )
}

const mapStateToProps = createStructuredSelector({
    moodData: paginatedMoodsSelector,
    tensionData: paginatedTensionsSelector
})
export default connect(mapStateToProps)(HomepageTabs)
