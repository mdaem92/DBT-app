import React,{useEffect} from 'react'
import { Button } from 'antd'
import { useState } from 'react'
import { FormContainer, Seperator } from './AddJournalForm.styles'
import { Input, Slider, Select, Switch, Form ,InputNumber } from 'antd'
import { FiSun, FiMoon } from "react-icons/fi";

const { TextArea } = Input
const { Option } = Select

const AddJournalForm = () => {

    const [state, setState] = useState({
        date: undefined,
        isDeadlineMissed: false,
        lastNightSummary: '',
        goalDescription: '',
        isMorningReport: true,
        mood: undefined,
        tension: undefined,
        selfEsteemReport: '',
        positiveReport: '',
        additionalNotes: ''
    })
    useEffect(() => {
        console.log("state updated: ",state);
       
    }, [state])



    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>

            
            <Switch checkedChildren={<FiSun />} unCheckedChildren={<FiMoon />} checked={state.isMorningReport} onChange={(val)=>setState({...state,isMorningReport:val})}/>
                
            {state.isMorningReport &&
                <Form.Item
                rules={[{ required: true, message: 'Last night summary is required' }]}
                name={'lastNightSummary'}
            >
                <TextArea placeholder={'Last night\'s summary'} autoSize />
            </Form.Item>}
            <Form.Item
                rules={[{ required: true, message: 'Today\'s goal is required' }]}
                name={'goalDescription'}
            >
                <TextArea placeholder={state.isMorningReport?'Today\'s goal':'Today\' goal overview'} autoSize />
            </Form.Item>
            <Form.Item
                rules={[{ required: true, message: 'Mood is required' }]}
                name={'mood'}
            >
                <Select placeholder={'Mood'}>
                    <Option value="2">++</Option>
                    <Option value="1">+</Option>
                    <Option value="0">+-</Option>
                    <Option value="-1">-</Option>
                    <Option value="-2">--</Option>
                </Select>
            </Form.Item>
            <Form.Item
                rules={[{ required: true, message: 'Tension is required' }]}
                name={'tension'}
            >
                <InputNumber min={0} max={100} placeholder={'Tension'} />
            </Form.Item>


            {!state.isMorningReport &&
            <Form.Item
                rules={[{ required: true, message: 'Positive notes is required' }]}
                name={'positiveReport'}
            >
                <TextArea placeholder={'positive Notes'} autoSize />
            </Form.Item>}
            {!state.isMorningReport &&
            <Form.Item
                rules={[{ required: true, message: 'Positive notes is required' }]}
                name={'selfEsteemReport'}
            >
                <TextArea placeholder={'Self-esteem report'} autoSize />
            </Form.Item>}
            <Form.Item
                rules={[{ required: false}]}
                name={'additionalNotes'}
            >
                <TextArea placeholder={'Additional notes'} autoSize />
            </Form.Item>
            
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddJournalForm
