import {ResponsiveLine } from '@nivo/line'

// import { data  } from '../../data/dummy-data'
import React, { useState, useEffect } from 'react'
import { Container } from './ResponsiveChart.styles'

const MyResponsiveLine = ({xAxisTitle,yAxisTitle, data}) => {

    const [state, setState] = useState({
        stacked: false
    })
    const { stacked } = state

    const toggleStacked = () => {
        setState({ stacked: !stacked })
    }

    // useEffect(() => {
    //     console.log(state);

    // }, [state])

    return (
        <Container>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: -2, max: 2, stacked: stacked, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: yAxisTitle,
                    legendOffset: 36,
                    legendPosition: 'middle',
                    // format: function(value){ 
                    //     return moment.unix(value).format('MMMM Do YYYY, h:mm');
                    // }
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: xAxisTitle,
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
            
            {/* <button onClick={toggleStacked}  >{stacked ? 'set unstacked' : 'set stacked'}</button> */}
        </Container>

    )
}
export default MyResponsiveLine