import React from 'react'
import useCurrentTime from '../../hooks/useCurrentTime'
import DeadlineCountdown from '../DeadlineCountdown/DeadlineCountdown.component'
import Time from '../Time/Time.component'
import {DateAndTimeContainer , DateContainer} from './DateAndTime.styles'
import moment from 'moment'

const DateAndTime = () => {
    const rawdate = useCurrentTime()
    const date = moment(rawdate).format("dd D MMM YYYY")
    return (
        <DateAndTimeContainer>
            <Time time={rawdate}/>
            <DateContainer>{`${date}`}</DateContainer>
            <DeadlineCountdown />
        </DateAndTimeContainer>
    )
}

export default DateAndTime
