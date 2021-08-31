import React, { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { FormContainer, RowContainer } from './AddJournalForm.styles'
import { Input, Select, Switch, Form, InputNumber, DatePicker } from 'antd'
import { FiSun, FiMoon } from "react-icons/fi";
import { connect } from 'react-redux'
import { submitJournalStart } from '../../Redux/journals/journals.actions'
import useCurrentTime from '../../hooks/useCurrentTime'
import { setFieldValue } from '../../Redux/form/form.actions'
import { createStructuredSelector } from 'reselect'
import { currentUserSelector, tagsSelector } from '../../Redux/user/user.selectors'
import { submissionErrorSelector } from '../../Redux/journals/journals.selectors'
import { withRouter } from 'react-router-dom'
import { formSelector } from '../../Redux/form/form.selectors'
import { notifyFriendsStart } from '../../Redux/notifications/notifications.actions';
import { fetchTagsStart } from '../../Redux/user/user.actions';

const { TextArea } = Input
const { Option } = Select

const AddJournalForm = ({ submit, setFieldValue, currentUser: user, errorMessage, history, form, notifyFriends, tags, fetchTags }) => {

    const currentDate = useCurrentTime()
    const [includedTags, setTags] = useState([])

    useEffect(() => {
        if (tags.length <= 0) {
            console.log('fetching tags from form');
            fetchTags()
        }

    }, [tags, fetchTags])

    useEffect(() => {
        console.log('current tags: ', includedTags);

    }, [includedTags])

    const onFinish = (values) => {

        const { uid, displayName } = user

        submit({ ...values, uid, displayName, isMorningReport: form.isMorningReport, tags: includedTags })
        // await notifyFriends('SUBMITTED_REPORT')
        message.success('Journal successfully added')
        console.log('history: ', history);
        history.push('/')
    };

    const getIncludedTags = (words) => {
        const res = []
        words.forEach(word => {
            if (tags.indexOf(word) > -1) {
                res.push(word)
            }
        })
        return res
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Journal submittion failed, Please try again later')

    };

    const retrieveUniqueWordsFromString = (sentence) => {
        return [...new Set(sentence.match(/("[^"]+"|[^"\s]+)/g))]
    }
    const storeDataOnBlur = ({ target: { id, value } }) => {
        if (value) {
            console.log(id);
            console.log(value);
            console.log(`going to store  on blur`);
            setFieldValue(id, value)
            //TODO: add tag generator logic here
            const words = retrieveUniqueWordsFromString(value)
            const usedTags = getIncludedTags(words)
            const temp = usedTags.concat(includedTags)
            console.log('temp: ', temp);
            console.log('used: ', usedTags);
            setTags([...new Set(temp)])
        }
    }

    const handleClear = (fieldName) => {
        console.log('clearing', fieldName);
        setFieldValue(fieldName, undefined)
    }


    const handleFieldChange = (fieldName, val) => {
        if (typeof val === "boolean" || (typeof val === "object" && val._isAMomentObject) || typeof val === "string") {
            return setFieldValue(fieldName, val)
        } if (typeof val === 'undefined') {
            return setFieldValue(fieldName, undefined)
        }
        return setFieldValue(fieldName, val.target.value)
    }

    const formatMoodOptions = (value) => {
        const formatter = {
            '2': '++',
            '1': '+',
            '0': '+-',
            '-1': '-',
            '-2': '--'
        }
        return formatter[value]

    }

    // console.log('current form: ', form);
    const { date, isMorningReport, ...initialValues } = form
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
                    onChange={handleFieldChange.bind(this, 'isMorningReport')}
                    className={'switch'}
                />
                <Form.Item
                    rules={[{ required: true, message: 'Date is required' }]}
                    name={'date'}
                    initialValue={currentDate}
                >
                    <DatePicker showNow onChange={handleFieldChange.bind(this, 'date')} allowClear={false} />
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

            <RowContainer>
                <Form.Item
                    rules={[{ required: true, message: 'Mood is required' }]}
                    name={form?.isMorningReport ? 'mood' : 'mood2'}

                >
                    <Select
                        placeholder={'Mood'}
                        allowClear
                        style={{width:'25vw'}}
                        onChange={handleFieldChange.bind(this, form?.isMorningReport ? 'mood' : 'mood2')}
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
            </RowContainer>



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
    notifyFriends: (notifType) => dispatch(notifyFriendsStart(notifType)),
    fetchTags: () => dispatch(fetchTagsStart())
})
const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector,
    errorMessage: submissionErrorSelector,
    form: formSelector,
    tags: tagsSelector
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddJournalForm))
