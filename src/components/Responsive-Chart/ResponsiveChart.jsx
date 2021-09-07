import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label
} from 'recharts';
import React from 'react'
import { Container } from './ResponsiveChart.styles'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { entriesPerChartSelector } from '../../Redux/journals/journals.selectors'
import { setFieldValue } from '../../Redux/journals/journals.actions'
import useWindowSize from '../../hooks/useWindowSize';



const ResponsiveLine = ({ xAxisTitle, yAxisTitle, min, max, data, label, domain, entriesPerChart,isFriendsView }) => {


    const newMoodAxis = {

        '9':'++',
        '8':'++/+',
        '7':'+',
        '6':'+/+-',
        '5':'+-',
        '4':'+-/-',
        '3':'-',
        '2':'-/--',
        '1':'--',
        


    }

    const moodTickFormatter = (tick) => !!newMoodAxis[tick.toString()] ? newMoodAxis[tick.toString()] : tick

    const width = useWindowSize()

    const legendFormat = {
        'mood': 'Morning',
        'tension': 'Morning',
        'mood2': 'Evening',
        'tension2': 'Evening',
    }
    const legendFormatter = (value, entry, index) => {
        return legendFormat[value] ? legendFormat[value] : value
    }
    const extractDataKeys = () => {
        if (data.length > 0) {
            const keys = Object.keys(data[0])
            return keys
        }
        else return ['', '', '']

    }

    const [date, morningDataKey, eveningDataKey] = extractDataKeys()



    return (
        <Container>
            <LineChart
                width={width >= 800 ?( !!isFriendsView ? width * 0.4 :width * 0.45  ): width * 0.9}
                height={400}
                data={data}
                margin={width >= 800 ?
                    {
                        top: 5, right: 50, left: 50, bottom: 5,
                    }
                    :
                    {
                        top: 20, right: 5, left: 5, bottom: 20
                    }
                }

            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={date} />
                <YAxis
                    orientation='left'
                    yAxisId='left'
                    domain={domain}
                    tickFormatter={moodTickFormatter}
                    fontSize={16}
                >
                    <Label
                        value={label}
                        angle={-90}
                        position='outside'
                        fill='#676767'
                        fontSize={14}
                    />
                </YAxis>
                <Tooltip
                // for custom tooltip component 
                // content={renderTooltip}
                />
                <Legend formatter={legendFormatter} />
                <Line type="monotone" yAxisId='left' dataKey={morningDataKey} stroke="#1890ff" activeDot={{ r: 8 }} />
                <Line type="monotone" yAxisId='left' dataKey={eveningDataKey} stroke="#5f5f5f" activeDot={{ r: 8 }} />

            </LineChart>
        </Container>

    )

}

const mapStateToProps = createStructuredSelector({
    entriesPerChart: entriesPerChartSelector,
})

const mapDispatchToProps = (dispatch) => ({
    toggleEntriesPerChart: (value) => dispatch(setFieldValue('entriesPerChart', value))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveLine)