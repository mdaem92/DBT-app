import React,{useState,useEffect} from 'react'
import { Container } from './DeadlineSwitchSetting.styles'
import { TimePicker, Switch } from 'antd'
import moment from 'moment'
import { FiSun, FiMoon } from "react-icons/fi";
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { deadlineDataSelector } from '../../Redux/user/user.selectors';
import { fetchDeadlineStart, setDeadlineStart } from '../../Redux/user/user.actions';

// const eveningDisabledHours = [...Array(12).keys()]
// const morningDisabledHours = [...Array(12).keys()].map(i=>i+13)
const eveningDisabledHours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
const morningDisabledHours = [0,1,2,3,4,13,14,15,16,17,18,19,20,21,22,23]

const DeadlineSwitchSetting = ({deadlineData,setDeadline,fetchDeadlineData}) => {

    const [isMorningDeadline, setisMorningDeadline] = useState(true)
    const [value,setValue] = useState(null)
    const {morningDeadline,eveningDeadline} = deadlineData
    useEffect(() => {
        if(typeof morningDeadline ==='undefined'|| typeof eveningDeadline ==='undefined'){
            fetchDeadlineData()
        }
        setValue(isMorningDeadline? moment(morningDeadline,'HH:mm') :moment(eveningDeadline,'HH:mm'))
        
    }, [fetchDeadlineData,morningDeadline,eveningDeadline,isMorningDeadline])


    const handleTimePicker = (time,timeString) => {
        console.log('time picker ',timeString);
        const deadlineType = isMorningDeadline ? 'morningDeadline':'eveningDeadline'
        if(timeString!==""){
            setDeadline(deadlineType,timeString)
            setValue(moment(timeString,'HH:mm'))  
        }else{
            setValue(null)
        }
    }

    const handleSwitchChange = () => {
        setisMorningDeadline(!isMorningDeadline)
    }

    const handleDisabledHours = ()=>{

        console.log('evenings disable: ',eveningDisabledHours);
        console.log('morning disable: ',morningDisabledHours);
        return isMorningDeadline? morningDisabledHours:eveningDisabledHours
    }


    return (
        <Container>
            <Switch
                onChange={handleSwitchChange}
                checkedChildren={<FiSun />}
                unCheckedChildren={<FiMoon />}
                checked={isMorningDeadline}
            />
            <TimePicker 
                onChange={handleTimePicker}
                value={ value } 
                format={'HH:mm'}
                allowClear
                bordered={false}
                disabledHours={handleDisabledHours}
                showNow={false} 
            />
        </Container>
    )
}


const mapStateToProps = createStructuredSelector({
    deadlineData: deadlineDataSelector
})

const mapDispatchToProps = (dispatch)=>({
    setDeadline:(deadlineType,value)=>dispatch(setDeadlineStart(deadlineType,value)),
    fetchDeadlineData:()=>dispatch(fetchDeadlineStart())
})



export default connect(mapStateToProps,mapDispatchToProps)(DeadlineSwitchSetting)
