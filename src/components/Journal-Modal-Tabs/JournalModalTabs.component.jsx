import React from 'react'
import { Tabs } from 'antd'
import { FiMoon, FiSun } from 'react-icons/fi'
import JournalModalTabsContent from '../Journal-Modal-Tabs-Content/JournalModalTabsContent.component'
import { TagsOutlined } from '@ant-design/icons'
import TagsDisplay from '../TagsDisplay/TagsDisplay.component'


const { TabPane } = Tabs

const JournalModalTabs = ({
    additionalNotesEvening,
    additionalNotesMorning,
    displayName,
    goalDescription,
    lastNightSummary,
    positiveReport,
    selfEsteemReport,
    todaysGoal,
    mood,
    mood2,
    tension,
    tension2,
    strongestEmotion,
    strongestEmotion2,
    tags,
    morningSubmissionTime,
    eveningSubmissionTime

}) => {

    const morning = { lastNightSummary, todaysGoal, strongestEmotion, mood, tension, additionalNotesMorning,morningSubmissionTime }
    const evening = { goalDescription, strongestEmotion2, positiveReport, selfEsteemReport, mood2, tension2, additionalNotesEvening,eveningSubmissionTime }
    return (
        <Tabs defaultActiveKey="1" >
            <TabPane
                tab={
                    <span>
                        <FiSun />
                        Morning
                    </span>
                }
                key="1"
            >
                <JournalModalTabsContent data={morning} />
            </TabPane>
            <TabPane
                tab={
                    <span>
                        <FiMoon />
                        Evening
                    </span>
                }
                key="2"
            >
                <JournalModalTabsContent data={evening} />

            </TabPane>
            {
                tags?.length>0 &&
                <TabPane
                tab={
                    <span>
                        <TagsOutlined />
                        Tags
                    </span>
                }
                key="3"
            >
                {/* <JournalModalTabsContent data={tags} /> */}
                <TagsDisplay tags={tags}/>

            </TabPane>
            }
        </Tabs>
    )
}

export default JournalModalTabs
