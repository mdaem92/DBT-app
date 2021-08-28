import React from 'react'
import { ChartPaginationContainer } from './Chart-pagination.styles'
import {createStructuredSelector} from 'reselect'
import { entriesPerChartSelector } from '../../Redux/journals/journals.selectors'
import { setFieldValue } from '../../Redux/journals/journals.actions'
import {Select} from 'antd'
import {connect} from 'react-redux'

const {Option} = Select
export const ChartPagination = ({entriesPerChart,setEntriesPerChart}) => {

    const handleChange = (value)=>{
        setEntriesPerChart(value)
    }
    return (
        <ChartPaginationContainer>
            <span>{entriesPerChart === 0 ? 'View' : 'View Last'}</span>
            <Select
                defaultValue={entriesPerChart === 0 ? 'All' : entriesPerChart}
                bordered={false}
                onChange={handleChange}
            >
                <Option value={7}>7</Option>
                <Option value={30}>30</Option>
                <Option value={0}>All</Option>
            </Select>
            <span>entries</span>
        </ChartPaginationContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    entriesPerChart: entriesPerChartSelector,
})

const mapDispatchToProps = (dispatch) => ({
    setEntriesPerChart: (value) => dispatch(setFieldValue('entriesPerChart', value))
})
export default connect(mapStateToProps,mapDispatchToProps)(ChartPagination)

