import React from 'react'
import {Tabs} from 'antd'
import MyResponsiveLine from '../Responsive-Chart/ResponsiveChart.component'
import { data ,moodData } from '../../data/dummy-data'

const {TabPane} = Tabs

const HomepageTabs = () => {

    const handleChange = ()=>{

    }
    return (
        <Tabs defaultActiveKey="1" onChange={handleChange}>
            <TabPane tab={'My Stats'} key="1">
                <MyResponsiveLine yAxisTitle={'Day'} xAxisTitle={'Mood'} data={moodData}/>
                {/* <MyResponsiveLine yAxisTitle={'Day'} xAxisTitle={'Tension'} data={data}/> */}
            </TabPane>
            <TabPane tab={'Teammate\'s'} key="2">
                teammate's stats
            </TabPane>
        </Tabs>
    )
}

export default HomepageTabs
