import React from 'react'
import { JournalContainer, SummaryContainer, ModalButtonArea, DateContainer } from './Journal.styles'
import { Button ,Modal } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import SummaryItem from '../Summary-Item/SummaryItem.component'
import { useState } from 'react'

const Journal = (
    {
        date,
        mood,
        mood2,
        tension,
        tension2,
        additionalNotesEvening,
        additionalNotesMorning,
        displayName,
        goalDescription,
        lastNightSummary,
        positiveReport,
        selfEsteemReport,
        todaysGoal,
    }) => {
    const [isModalVisible,setModalVisible] = useState(false)
    const handleOk = ()=>{
        setModalVisible(false)
    }
    const handleCancel = ()=>{
        setModalVisible(false)

    }
    const handleModal = () => {
        if(!isModalVisible){
            setModalVisible(true)
        }
    }
    
    return (
        <JournalContainer>
            <DateContainer>
                {date}
            </DateContainer>
            <SummaryContainer>
                <SummaryItem morning mood={mood} tension={tension} />
                <SummaryItem mood={mood2} tension={tension2} />
            </SummaryContainer>
            <ModalButtonArea>
                <Button
                    icon={<DownOutlined />}
                    onClick={handleModal}
                >
                    View more
                </Button>
                <Modal title={date} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </ModalButtonArea>

        </JournalContainer>
    )
}

export default Journal