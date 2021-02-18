import React, { useEffect } from 'react'
import { Button } from 'antd'
import { useState } from 'react'
import { FormContainer, ItemContainer, RowContainer } from './AddJournalForm.styles'
import { Input, Select, Switch, Form, InputNumber, DatePicker } from 'antd'
import { FiSun, FiMoon } from "react-icons/fi";
import { connect } from 'react-redux'
import { submitJournalStart } from '../../Redux/journals/journals.actions'
import useCurrentTime from '../../hooks/useCurrentTime'
import { setFieldValue } from '../../Redux/form/form.actions'
import useCurrentUser from '../../hooks/useCurrentUser'

const { TextArea } = Input
const { Option } = Select

const AddJournalForm = ({ submit, setFieldValue }) => {

    const [state, setState] = useState({
        date: undefined,
        isDeadlineMissed: false,
        // lastNightSummary: '',
        // goalDescription: '',
        isMorningReport: true,
        // mood: undefined,
        // tension: undefined,
        // selfEsteemReport: '',
        // positiveReport: '',
        // additionalNotes: ''
    })
    useEffect(() => {
        console.log("state updated: ", state);

    }, [state])


    const user = useCurrentUser()
    const { isMorningReport } = state
    const currentDate = useCurrentTime()

    const onFinish = (values) => {

        const { uid, displayName } = user
        console.log('Success:', values);
        submit({ ...values, uid, displayName, isMorningReport })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };
    const preventSubmitOnEnter = (e) => {
        if (e.code === "Enter" || e.code === 'NumpadEnter') {
            e.preventDefault()
        }
    }
    const storeDataOnBlur = ({ target: { id, value } }) => {
        console.log(id);
        console.log(value);
        console.log(`going to store  on blur`);
    }

    return (

        <FormContainer
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        // onKeyDown={preventSubmitOnEnter}

        >
            <RowContainer>
                <Switch
                    checkedChildren={<FiSun />}
                    unCheckedChildren={<FiMoon />}
                    checked={state.isMorningReport}
                    onChange={(val) => setState({ ...state, isMorningReport: val })}
                    className={'switch'}
                />
                <Form.Item
                    rules={[{ required: true, message: 'Date is required' }]}
                    name={'date'}
                    initialValue={currentDate}
                >
                    <DatePicker showNow />
                </Form.Item>
            </RowContainer>

            {
                isMorningReport &&

                <Form.Item
                    rules={[{ required: true, message: 'Last night summary is required' }]}
                    name={'lastNightSummary'}
                >
                    <TextArea placeholder={'Last night\'s summary'} autoSize allowClear onBlur={storeDataOnBlur} />
                </Form.Item>


            }

            {
                isMorningReport ?
                    <Form.Item
                        rules={[{ required: true, message: 'Today\'s goal is required' }]}
                        name={'todaysGoal'}
                    >
                        <TextArea placeholder={'Today\'s goal'} autoSize onBlur={storeDataOnBlur} />
                    </Form.Item>
                    :
                    <Form.Item
                        rules={[{ required: true, message: 'Goal description is required' }]}
                        name={'goalDescription'}
                    >
                        <TextArea placeholder={'Today\' goal overview'} autoSize onBlur={storeDataOnBlur} />
                    </Form.Item>
            }
            <Form.Item
                rules={[{ required: true, message: 'Strongest emotion is required' }]}
                name={isMorningReport ? 'strongestEmotion' : 'strongestEmotion2'}
            >
                <TextArea placeholder={'Your strongest emotion'} autoSize onBlur={storeDataOnBlur} />

            </Form.Item>


            <Form.Item
                rules={[{ required: true, message: 'Mood is required' }]}
                name={isMorningReport ? 'mood' : 'mood2'}
            >
                <Select placeholder={'Mood'} onBlur={storeDataOnBlur}>
                    <Option value="2">++</Option>
                    <Option value="1">+</Option>
                    <Option value="0">+-</Option>
                    <Option value="-1">-</Option>
                    <Option value="-2">--</Option>
                </Select>
            </Form.Item>


            <Form.Item
                rules={[{ required: true, message: 'Tension is required' }]}
                name={isMorningReport ? 'tension' : 'tension2'}
            >
                <InputNumber min={0} max={100} placeholder={'Tension'} onBlur={storeDataOnBlur} />
            </Form.Item>


            {
                !state.isMorningReport &&

                <Form.Item
                    rules={[{ required: true, message: 'Positive notes is required' }]}
                    name={'positiveReport'}
                >
                    <TextArea placeholder={'positive Notes'} autoSize onBlur={storeDataOnBlur} />
                </Form.Item>

            }
            {
                !state.isMorningReport &&

                <Form.Item
                    rules={[{ required: true, message: 'Positive notes is required' }]}
                    name={'selfEsteemReport'}
                >
                    <TextArea placeholder={'Self-esteem report'} autoSize onBlur={storeDataOnBlur} />
                </Form.Item>

            }


            {
                isMorningReport ?
                    <Form.Item
                        rules={[{ required: false }]}
                        name={'additionalNotesMorning'}
                    >
                        <TextArea placeholder={'Additional notes'} autoSize onBlur={storeDataOnBlur} />
                    </Form.Item>
                    :
                    <Form.Item
                        rules={[{ required: false }]}
                        name={'additionalNotesEvening'}
                    >
                        <TextArea placeholder={'Additional notes'} autoSize onBlur={storeDataOnBlur} />
                    </Form.Item>
            }



            <Form.Item>
                <Button type="primary" htmlType="submit" >
                    Submit
                </Button>
            </Form.Item>


        </FormContainer>
    )
}

const mapDispatchToProps = (dispatch) => ({
    submit: (journal) => dispatch(submitJournalStart(journal)),
    setFieldValue: (name, value) => dispatch(setFieldValue(name, value))
})

export default connect(undefined, mapDispatchToProps)(AddJournalForm)
