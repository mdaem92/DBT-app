import React from 'react'
import {Tabs} from 'antd'
import MyResponsiveLine from '../Responsive-Chart/ResponsiveChart.component'
import { TabPaneContainer } from './HomepageTabs.styles'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { moodsSelector, tensionsSelector } from '../../Redux/journals/journals.selectors'
import NewResponsiveChart from '../../playground/NewResponsiveChart'

const {TabPane} = Tabs

const HomepageTabs = ({moodData,tensionData}) => {

    const handleChange = ()=>{

    }
    return (
        <Tabs defaultActiveKey="1" onChange={handleChange}>
            <TabPaneContainer tab={'My Stats'} key="1">
                <NewResponsiveChart yAxisTitle = {'Mood'} xAxisTitle={'Date'} data={moodData} label={'Mood'} domain={[-2,2]}/>
                <NewResponsiveChart yAxisTitle = {'Tension'} xAxisTitle={'Date'} data={tensionData} label={'Tension'} domain={[0,100]}/>
            </TabPaneContainer>
            <TabPane tab={'Teammate\'s'} key="2">
                teammate's stats
            </TabPane>
        </Tabs>
    )
}

const mapStateToProps = createStructuredSelector({
    moodData:moodsSelector,
    tensionData:tensionsSelector
})
export default  connect(mapStateToProps)(HomepageTabs)
