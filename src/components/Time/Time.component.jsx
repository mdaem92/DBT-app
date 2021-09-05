import React from 'react'
import {Container ,HourMinuteContainer } from './Time.styles'

const Time = ({time}) => {

    const hour = time.format('HH')
    const minutes  = time.format('mm')
    return (
        <Container>
            <HourMinuteContainer>{`${hour}:${minutes}`}</HourMinuteContainer>
        </Container>
    )
}

export default Time
