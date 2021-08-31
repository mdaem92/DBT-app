import React from 'react'
import {  ChartsContainer } from './HomepageTabs.styles'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { paginatedMoodsSelector, paginatedTensionsSelector } from '../../Redux/journals/journals.selectors'
import NewResponsiveChart from '../Responsive-Chart/ResponsiveChart'
import ChartPagination from '../Chart-Pagination/Chart-pagination.component'



const HomepageTabs = ({ moodData, tensionData }) => {   



    console.log("mood data \n",moodData);
    return (
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
