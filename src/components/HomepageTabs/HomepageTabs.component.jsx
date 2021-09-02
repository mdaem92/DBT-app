import React from 'react'
import {  ChartsContainer , EmptyScreen } from './HomepageTabs.styles'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { paginatedMoodsSelector, paginatedTensionsSelector } from '../../Redux/journals/journals.selectors'
import NewResponsiveChart from '../Responsive-Chart/ResponsiveChart'
import ChartPagination from '../Chart-Pagination/Chart-pagination.component'
import { Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'



const HomepageTabs = ({ moodData, tensionData,history }) => {   



    console.log("mood data \n",moodData);
    console.log("tension data \n",tensionData);

    const handleCreateFirst = ()=>{
        history.push('/add-journal')
    }
    return moodData?.length > 0 ? (
        <div>
            <ChartPagination />
            <ChartsContainer homepage>
                <NewResponsiveChart yAxisTitle={'Mood'} xAxisTitle={'Date'} data={moodData} label={'Mood'} domain={[-2, 2]} />
                <NewResponsiveChart yAxisTitle={'Tension'} xAxisTitle={'Date'} data={tensionData} label={'Tension'} domain={[0, 100]} />
            </ChartsContainer>
        </div>

    )
    :
    (
        <EmptyScreen>
 
            <Button
                 icon={<PlusOutlined /> }
                 onClick={handleCreateFirst}
                 type={'primary'}
            >
                Create your first Journal
            </Button>
        </EmptyScreen>
    )
}

const mapStateToProps = createStructuredSelector({
    moodData: paginatedMoodsSelector,
    tensionData: paginatedTensionsSelector
})
export default withRouter(connect(mapStateToProps)(HomepageTabs))
