import React from 'react'
import useCurrentTime from '../../hooks/useCurrentTime'
import {Statistic} from 'antd'
import moment from 'moment'
import { CountdownContainer } from './DeadlineCountdown.styles'

const {Countdown} = Statistic

const DeadlineCountdown = ()=> {
    const currentTime = useCurrentTime()



    const onFinish = ()=>{
        console.log('deadline finished');
    }
    
    const calculateDeadline = (currentTime)=>{
        const currentHour = currentTime.hour()
        const morningEnd = '11:00'
        const eveningEnd = '22:00'
        const eveningDeadline = moment(eveningEnd,"HH:mm")
        const morningDeadline = moment(morningEnd,'HH:mm')
        if (currentHour>=12){

            if (eveningDeadline.diff(currentTime,'seconds')>0){
                // console.log('evening deadline isnt reached yet');
                return eveningDeadline
            }else{
                // console.log('evening deadline is reached');
                // console.log('next morning deadline: ',morningDeadline.add(12,'hours'));
                return morningDeadline.add(12,'hours')
            } 
        }else{
            if (morningDeadline.diff(currentTime,'seconds')>0){
                // console.log('morning deadline isnt reached yet');
                // console.log(morningDeadline);
                return morningDeadline
            }else{
                // console.log('morning deadline is reached');
                // console.log(eveningDeadline);
                return eveningDeadline
            }
        }
    }
    const deadline = calculateDeadline(currentTime)
    return (
        <CountdownContainer>
            <Countdown value={deadline} onFinish={onFinish} title={'Deadline in:'} format={'H[h] m[m] s[s]'}/>
        </CountdownContainer>
    )
}

export default DeadlineCountdown
