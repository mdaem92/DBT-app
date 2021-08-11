import React from 'react'
import { Button, message } from 'antd'
import { FormContainer, RowContainer } from './AddJournalForm.styles'
import { Input, Select, Switch, Form, InputNumber, DatePicker } from 'antd'
import { FiSun, FiMoon } from "react-icons/fi";
import { connect } from 'react-redux'
import { submitJournalStart } from '../../Redux/journals/journals.actions'
import useCurrentTime from '../../hooks/useCurrentTime'
import { setFieldValue } from '../../Redux/form/form.actions'
import { createStructuredSelector } from 'reselect'
import { currentUserSelector } from '../../Redux/user/user.selectors'
import { submissionErrorSelector } from '../../Redux/journals/journals.selectors'
import { withRouter } from 'react-router-dom'
import { formSelector } from '../../Redux/form/form.selectors'
import { notifyFriendsFailure, notifyFriendsStart } from '../../Redux/notifications/notifications.actions';

const { TextArea } = Input
const { Option } = Select

const AddJournalForm = ({ submit, setFieldValue ,currentUser:user , errorMessage, history ,form , notifyFriends }) => {

    const currentDate = useCurrentTime()

    const onFinish = (values) => {

        const { uid, displayName } = user
        submit({ ...values, uid, displayName, isMorningReport:form.isMorningReport })
        // await notifyFriends('SUBMITTED_REPORT')
        message.success('Journal successfully added')
        console.log('history: ',history);
        history.push('/')
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Journal submittion failed, Please try again later')

    };

    const retrieveUniqueWordsFromString = (sentence)=>{
        return [...new Set(sentence.match(/("[^"]+"|[^"\s]+)/g))]
    }
    const storeDataOnBlur = ({ target: { id, value } }) => {
        if(value){
            console.log(id);
            console.log(value);
            console.log(`going to store  on blur`);
            setFieldValue(id,value)
            //TODO: add tag generator logic here
            const results = retrieveUniqueWordsFromString(value)
            console.log('words',results);
        }
    }

    const handleClear = (fieldName)=>{
        console.log('clearing',fieldName);
        setFieldValue(fieldName,undefined)
    }


    const handleFieldChange = (fieldName,val)=>{
        if(typeof val ==="boolean" || (typeof val ==="object" && val._isAMomentObject ) || typeof val ==="string"){
            return setFieldValue(fieldName,val)
        }if(typeof val ==='undefined'){
            return setFieldValue(fieldName,undefined)    
        }
        return setFieldValue(fieldName,val.target.value)
    }

    console.log('current form: ',form);
    const {date,isMorningReport,...initialValues} = form
    return (

        <FormContainer
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={initialValues}
            
        // onKeyDown={preventSubmitOnEnter}

        >
            <RowContainer>
                <Switch
                    checkedChildren={<FiSun />}
                    unCheckedChildren={<FiMoon />}
                    checked={form.isMorningReport}
                    onChange={handleFieldChange.bind(this,'isMorningReport')}
                    className={'switch'}
                />
                <Form.Item
                    rules={[{ required: true, message: 'Date is required' }]}
                    name={'date'}
                    initialValue={currentDate}
                >
                    <DatePicker showNow onChange={handleFieldChange.bind(this,'date')}/>
                </Form.Item>
            </RowContainer>

            {
                form?.isMorningReport &&

                <Form.Item
                    rules={[{ required: true, message: 'Last night summary is required' }]}
                    name={'lastNightSummary'}                    
                >
                    <TextArea 
                        placeholder={'Last night\'s summary'} 
                        autoSize 
                        allowClear 
                        onBlur={storeDataOnBlur} 
                        value={form.lastNightSummary}
                    />
                </Form.Item>


            }

            {
                form?.isMorningReport ?
                    <Form.Item
                        rules={[{ required: true, message: 'Today\'s goal is required' }]}
                        name={'todaysGoal'}
                    >
                        <TextArea 
                            placeholder={'Today\'s goal'} 
                            autoSize
                            allowClear 
                            onBlur={storeDataOnBlur}
                            value={form.todaysGoal}                            
                            />
                    </Form.Item>
                    :
                    <Form.Item
                        rules={[{ required: true, message: 'Goal description is required' }]}
                        name={'goalDescription'}
                    >
                        <TextArea 
                            placeholder={'Today\' goal overview'} 
                            autoSize
                            allowClear 
                            onBlur={storeDataOnBlur}
                        />
                    </Form.Item>
            }
            <Form.Item
                rules={[{ required: true, message: 'Strongest emotion is required' }]}
                name={form?.isMorningReport ? 'strongestEmotion' : 'strongestEmotion2'}
            >
                <TextArea 
                    placeholder={'Your strongest emotion'} 
                    autoSize
                    allowClear 
                    onBlur={storeDataOnBlur}
                />

            </Form.Item>


            <Form.Item
                rules={[{ required: true, message: 'Mood is required' }]}
                name={form?.isMorningReport ? 'mood' : 'mood2'}
            >
                <Select 
                    placeholder={'Mood'}
                    allowClear 
                    // onBlur={storeDataOnBlur}
                    // onClear={handleClear.bind(this,form?.isMorningReport ? 'mood' : 'mood2')}
                    onChange={handleFieldChange.bind(this,form?.isMorningReport ? 'mood' : 'mood2')}
                >
                    <Option value="2">++</Option>
                    <Option value="1">+</Option>
                    <Option value="0">+-</Option>
                    <Option value="-1">-</Option>
                    <Option value="-2">--</Option>
                </Select>
            </Form.Item>


            <Form.Item
                rules={[{ required: true, message: 'Tension is required' }]}
                name={form?.isMorningReport ? 'tension' : 'tension2'}
            >
                <InputNumber 
                    min={0} 
                    max={100} 
                    placeholder={'Tension'} 
                    onBlur={storeDataOnBlur}
                />
            </Form.Item>


            {
                !form?.isMorningReport &&

                <Form.Item
                    rules={[{ required: true, message: 'Positive notes is required' }]}
                    name={'positiveReport'}
                >
                    <TextArea 
                        placeholder={'positive Notes'} 
                        autoSize 
                        onBlur={storeDataOnBlur}
                    />
                </Form.Item>

            }
            {
                !form?.isMorningReport &&

                <Form.Item
                    rules={[{ required: true, message: 'Positive notes is required' }]}
                    name={'selfEsteemReport'}
                >
                    <TextArea 
                        placeholder={'Self-esteem report'} 
                        autoSize 
                        onBlur={storeDataOnBlur}
                    />
                </Form.Item>

            }
            {
                form?.isMorningReport ?
                    <Form.Item
                        rules={[{ required: false }]}
                        name={'additionalNotesMorning'}
                    >
                        <TextArea 
                            placeholder={'Additional notes'} 
                            autoSize
                            onBlur={storeDataOnBlur}
                        />
                    </Form.Item>
                    :
                    <Form.Item
                        rules={[{ required: false }]}
                        name={'additionalNotesEvening'}
                    >
                        <TextArea 
                            placeholder={'Additional notes'} 
                            autoSize 
                            onBlur={storeDataOnBlur}
                        />
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
    setFieldValue: (name, value) => dispatch(setFieldValue(name, value)),
    notifyFriends:(notifType)=>dispatch(notifyFriendsStart(notifType))
})
const mapStateToProps = createStructuredSelector({
    currentUser:currentUserSelector,
    errorMessage:submissionErrorSelector,
    form:formSelector
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddJournalForm))
