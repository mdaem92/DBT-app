import React,{useEffect} from 'react'
import useCurrentTime from '../../hooks/useCurrentTime'
import { Statistic, Alert } from 'antd'
import moment from 'moment'
import { CountdownContainer , DeadlineSwitchSettingContainer } from './DeadlineCountdown.styles'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { currentUserSelector, deadlineDataSelector } from '../../Redux/user/user.selectors'
import DeadlineSwitchSetting from '../Deadline-Switch-setting/DeadlineSwitchSetting.component'
import { fetchDeadlineStart } from '../../Redux/user/user.actions'
import { sendRequestStart } from '../../Redux/notifications/notifications.actions'

const { Countdown } = Statistic

const DeadlineCountdown = ({ deadlineData , fetchDeadlines , sendRequest , currentUser }) => {
    const currentTime = useCurrentTime()

    useEffect(() => {
       if(!!deadlineData.morningDeadline || !!deadlineData.eveningDeadline){
           fetchDeadlines()
       } 
    }, [deadlineData.morningDeadline,deadlineData.eveningDeadline,fetchDeadlines])


    const onFinish = () => {
        console.log('deadline finished');
        const eveningDeadline = moment(eveningEnd, "HH:mm")
        const morningDeadline = moment(morningEnd, 'HH:mm')
        if (currentTime<morningDeadline){
            sendRequest(currentUser,currentUser.uid,'EVENING_DEADLINE_MISSED')
        }
        if(currentTime<eveningDeadline){
            sendRequest(currentUser,currentUser.uid,'MORNING_DEADLINE_MISSED')
        }
        // fetchDeadlines()
    }

    const {morningDeadline:morningEnd,eveningDeadline:eveningEnd} = deadlineData


    const calculateDeadline = (currentTime) => {
        const currentHour = currentTime.hour()
        const eveningDeadline = moment(eveningEnd, "HH:mm")
        const morningDeadline = moment(morningEnd, 'HH:mm')
        console.log('evening deadline: ', eveningEnd);
        console.log('morning deadline: ', morningEnd);
        if (currentHour >= 12) {
            console.log('current time past 12 ', currentHour);

            if (eveningDeadline.diff(currentTime, 'seconds') > 0) {
                console.log('evening deadline isnt reached yet');
                return eveningDeadline
            } else {
                console.log('next morning deadline: ', morningDeadline.add(12, 'hours'));
                return morningDeadline.add(12, 'hours')
            }
        } else {
            if (morningDeadline.diff(currentTime, 'seconds') > 0) {

                return morningDeadline
            } else {

                return eveningDeadline
            }
        }
    }

    const deadline = calculateDeadline(currentTime)

    return (
        <CountdownContainer>
            {
                !!(morningEnd && eveningEnd) ?
                    <Countdown value={deadline} onFinish={onFinish} title={'Deadline in:'} format={'H[h] m[m]'} />
                    :
                    <DeadlineSwitchSettingContainer>
                        <Alert message="No deadlines given. Select report deadlines below to view deadline countdown" type="warning" />
                        <DeadlineSwitchSetting />
                    </DeadlineSwitchSettingContainer>

            }
        </CountdownContainer>
    )

}

const mapStateToProps = createStructuredSelector({
    deadlineData: deadlineDataSelector,
    currentUser:currentUserSelector
})
const mapDispatchToProps = (dispatch)=>({
    fetchDeadlines:()=>dispatch(fetchDeadlineStart()),
    sendRequest:(sender,receiverId,type)=>dispatch(sendRequestStart(sender,receiverId,type))
})

export default connect(mapStateToProps,mapDispatchToProps)(DeadlineCountdown)
