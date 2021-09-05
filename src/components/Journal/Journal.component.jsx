import React from 'react'
import { JournalContainer, SummaryContainer, ModalButtonArea, DateContainer } from './Journal.styles'
import { Button ,Modal } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import SummaryItem from '../Summary-Item/SummaryItem.component'
import { useState } from 'react'
import JournalModalTabs from '../Journal-Modal-Tabs/JournalModalTabs.component'

const moodHandler = {
    '9': '++',
    '8':'++/+',
    '7': '+',
    '6':'+/+-',
    '5': '+-',
    '4':'+-/-',
    '3': '-',
    '2':'-/--',
    '1': '--'
}
const Journal = (
    {
        date,
        mood,
        mood2,
        tension,
        tension2,
        ...otherProps
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
                <SummaryItem morning mood={moodHandler[mood]} tension={tension} />
                <SummaryItem mood={moodHandler[mood2]} tension={tension2} />
            </SummaryContainer>
            <ModalButtonArea>
                <Button
                    icon={<DownOutlined />}
                    onClick={handleModal}
                >
                    View more
                </Button>
                <Modal 
                    title={date} 
                    visible={isModalVisible} 
                    onOk={handleOk} 
                    onCancel={handleCancel}
                    bodyStyle={{padding:'0 24px'}}
                >
                    <JournalModalTabs {...{...otherProps,mood,mood2,tension,tension2}}/>
                </Modal>
            </ModalButtonArea>

        </JournalContainer>
    )
}

export default Journal