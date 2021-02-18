import React from 'react'
import { Tabs } from 'antd'
import { FiMoon, FiSun } from 'react-icons/fi'
import JournalModalTabsContent from '../Journal-Modal-Tabs-Content/JournalModalTabsContent.component'


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
    strongestEmotion2

}) => {

    const morning = { lastNightSummary, todaysGoal, strongestEmotion, mood, tension, additionalNotesMorning }
    const evening = { goalDescription, strongestEmotion2, positiveReport, selfEsteemReport, mood2, tension2, additionalNotesEvening }
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
        </Tabs>
    )
}

export default JournalModalTabs
