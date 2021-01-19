import React, { useEffect } from 'react'
import { Button } from 'antd'
import { useState } from 'react'
import { FormContainer, ItemContainer  } from './AddJournalForm.styles'
import { Input, Select, Switch, Form, InputNumber } from 'antd'
import { FiSun, FiMoon } from "react-icons/fi";
import {connect}from 'react-redux'
import {submitJournal} from '../../Redux/journals/journals.actions'


const { TextArea } = Input
const { Option } = Select

const AddJournalForm = ({submit}) => {

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
        console.log("state updated: ", state);

    }, [state])



    const onFinish = (values) => {
        console.log('Success:', values);
        submit({...values})
        
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        
    };
    const preventSubmitOnEnter = (e)=>{
        if(e.code ==="Enter" || e.code ==='NumpadEnter' ){
            e.preventDefault()
        }
    }

    return (

        <FormContainer onFinish={onFinish} onFinishFailed={onFinishFailed} onKeyDown={preventSubmitOnEnter}>
            <Switch 
                checkedChildren={<FiSun />} 
                unCheckedChildren={<FiMoon />} 
                checked={state.isMorningReport} 
                onChange={(val) => setState({ ...state, isMorningReport: val })}
                className={'switch'} 
            />
            {
                state.isMorningReport &&
                <ItemContainer>
                    <Form.Item
                        rules={[{ required: true, message: 'Last night summary is required' }]}
                        name={'lastNightSummary'}
                    >
                        <TextArea placeholder={'Last night\'s summary'} autoSize />
                    </Form.Item>
                </ItemContainer>

            }
            <ItemContainer>
                <Form.Item
                    rules={[{ required: true, message: 'Today\'s goal is required' }]}
                    name={'goalDescription'}
                >
                    <TextArea placeholder={state.isMorningReport ? 'Today\'s goal' : 'Today\' goal overview'} autoSize />
                </Form.Item>
            </ItemContainer>
            <ItemContainer>
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
            </ItemContainer>
            <ItemContainer>
                <Form.Item
                    rules={[{ required: true, message: 'Tension is required' }]}
                    name={'tension'}
                >
                    <InputNumber min={0} max={100} placeholder={'Tension'} />
                </Form.Item>
            </ItemContainer>

            {
                !state.isMorningReport &&
                <ItemContainer>
                    <Form.Item
                        rules={[{ required: true, message: 'Positive notes is required' }]}
                        name={'positiveReport'}
                    >
                        <TextArea placeholder={'positive Notes'} autoSize />
                    </Form.Item>
                </ItemContainer>
            }
            {
                !state.isMorningReport &&
                <ItemContainer>
                    <Form.Item
                        rules={[{ required: true, message: 'Positive notes is required' }]}
                        name={'selfEsteemReport'}
                    >
                        <TextArea placeholder={'Self-esteem report'} autoSize />
                    </Form.Item>
                </ItemContainer>
            }
            <ItemContainer>
                <Form.Item
                    rules={[{ required: false }]}
                    name={'additionalNotes'}
                >
                    <TextArea placeholder={'Additional notes'} autoSize  />
                </Form.Item>
            </ItemContainer>
            <ItemContainer>
                <Form.Item>
                    <Button type="primary" htmlType="submit" >
                        Submit
                </Button>
                </Form.Item>
            </ItemContainer>

        </FormContainer>
    )
}

const mapDispatchToProps = (dispatch)=>({
    submit:(journal)=>dispatch(submitJournal(journal))
})

export default connect(undefined,mapDispatchToProps)(AddJournalForm)
