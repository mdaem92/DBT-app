import React from 'react'
import { ParagraphContainer, Title, ContentContainer } from './Paragraph.styles'
import moment from 'moment'

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

const Paragraph = ({ title, content, deadline,isMorning }) => {

    const checkDeadlineMissed = ()=>{
        if (title==='Time submitted'){
            const submissionTime = moment(content, "HH:mm")
            const deadlineTime = moment(deadline, 'HH:mm')
            const midnight = moment('00:00','HH:mm').add(1,'day')
            // console.log(submissionTime);
            // console.log(deadlineTime);
            console.log(`submitted: ${submissionTime} deadline: ${deadlineTime} `);
            // const res = submissionTime>deadlineTime
            // console.log('is submission after midnight? ',submissionTime>midnight);
            // // console.log('is Deadline missed: ',res);
            // return res
            if (isMorning){
                console.log('its morning time');
                return submissionTime>deadlineTime
            }else {
                console.log('its evening time');
                if(submissionTime>midnight){
                    console.log('evening deadline missed');
                    console.log(submissionTime>midnight);
                    return true
                }else{
                    console.log('evening journal submitted on time');
                    console.log(midnight);
                    return submissionTime>deadlineTime
                }
            }
        }
        return false
        
    }

    const isDeadlineMissed = checkDeadlineMissed()

    return (
        <ParagraphContainer>
            <Title>{title}</Title>
            {
                title === 'Mood' ?
                    <ContentContainer>{moodHandler[content]}</ContentContainer>
                    :
                    <ContentContainer
                        isDeadlineMissed={isDeadlineMissed}
                    >
                        {content}
                    </ContentContainer>

            }
        </ParagraphContainer>
    )
}



export default Paragraph
