import { ResponsiveLine } from '@nivo/line'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label
} from 'recharts';
// import { data  } from '../../data/dummy-data'
import React, { useState, useEffect } from 'react'
import { Container } from './ResponsiveChart.styles'

const MyResponsiveLine = ({ xAxisTitle, yAxisTitle, min, max  }) => {

    const [state, setState] = useState({
        stacked: false
    })
    const { stacked } = state

    const toggleStacked = () => {
        setState({ stacked: !stacked })
    }

    const data = [
        {
            name: 'Mon', mood: 0, tension: 50, mood2: 1, tension2: 40, amt: 2400,
        },
        {
            name: 'Tue', mood: 1, tension: 30, mood2: 0, tension2: 40, amt: 2210,
        },
        {
            name: 'Wed', mood: 0, tension: 55, mood2: 0, tension2: 30, amt: 2290,
        },
        {
            name: 'Thu', mood: 1, tension: 35, mood2: -1, tension2: 55, amt: 2000,
        },
        {
            name: 'Fri', mood: -1, tension: 60, mood2: 0, tension2: 40, amt: 2181,
        },
        {
            name: 'Sat', mood: 0, tension: 30, mood2: -2, tension2: 55, amt: 2500,
        },
        {
            name: 'Sun', mood: 0, tension: 35, mood2: -1, tension2: 30, amt: 2100,
        },
    ];
    const moodAxis = {
        '2': '++',
        '1': '+',
        '0': '+-',
        '-1': '-',
        '-2':'--'
    }
    const moodTickFormatter = (tick)=> moodAxis[tick.toString()]

    return (
        <Container>
            <LineChart
                width={700}
                height={500}
                data={data}
                margin={{
                    top: 5, right: 50, left: 50, bottom: 100,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                    yAxisId='left'
                    dataKey={'tension'}
                    domain={[0, 100]}
                >
                    <Label
                        value={'Tension'}
                        angle={-90}
                        position='outside'
                        fill='#676767'
                        fontSize={14}
                    />
                </YAxis>
                <YAxis
                    orientation='right'
                    yAxisId='right'
                    domain={[-2, 2]}
                    tickFormatter={moodTickFormatter}
                    fontSize={16}
                    
                >
                    <Label
                        value={'Mood'}
                        angle={-90}
                        position='outside'
                        fill='#1890ff'
                        fontSize={14}
                    />
                </YAxis>
                <Tooltip
                // for custom tooltip component 
                // content={renderTooltip}
                />
                <Legend />
                <Line type="monotone" yAxisId='right' dataKey="mood" stroke="#1890ff" activeDot={{ r: 8 }} /> 
                <Line type="monotone" yAxisId='left' dataKey="tension" stroke="#5f5f5f" activeDot={{ r: 8 }} />
            </LineChart>


            {/* <button onClick={toggleStacked}  >{stacked ? 'set unstacked' : 'set stacked'}</button> */}
        </Container>

    )
}
export default MyResponsiveLine