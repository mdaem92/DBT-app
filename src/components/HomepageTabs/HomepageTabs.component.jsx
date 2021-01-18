import React from 'react'
import {Tabs} from 'antd'
import MyResponsiveLine from '../Responsive-Chart/ResponsiveChart.component'
import { moodData, tensionData } from '../../data/dummy-data'
import { TabPaneContainer } from './HomepageTabs.styles'

const {TabPane} = Tabs

const HomepageTabs = () => {

    const handleChange = ()=>{

    }
    return (
        <Tabs defaultActiveKey="1" onChange={handleChange}>
            <TabPaneContainer tab={'My Stats'} key="1">
                <MyResponsiveLine yAxisTitle={'Date'} xAxisTitle={' Mood'} />
                <MyResponsiveLine yAxisTitle={'Date'} xAxisTitle={'Tension'}  min={0} max={100}  dataKey={'Tension'}/>
            </TabPaneContainer>
            <TabPane tab={'Teammate\'s'} key="2">
                teammate's stats
            </TabPane>
        </Tabs>
    )
}

export default HomepageTabs
