import React from 'react'
import {ContentContainer,ItemContainer} from './JournalModalTabsContent.styles'
import Paragraph from '../Paragraph/Paragraph.component'


const titleHandler = {
    additionalNotesEvening:'Additional Notes',
    additionalNotesMorning:'Additional Notes',
    goalDescription:'Goal description',
    lastNightSummary:'Last night\'s summary',
    positiveReport:'Positive report',
    selfEsteemReport:'Self-esteem report',
    todaysGoal:'Today\'s goal',
    mood:'Mood',
    mood2:'Mood',
    tension:'Tension',
    tension2:'Tension',
    strongestEmotion:'Strongest emotion',
    strongestEmotion2:'Strongest emotion',
    eveningSubmissionTime:'Time submitted',
    morningSubmissionTime:'Time submitted',

}

const JournalModalTabsContent = ({data,deadline,isMorning}) => {
    const keys = Object.keys(data)
    const values = Object.values(data)

    return (
        <ContentContainer>
            <ItemContainer>
                {
                    keys.map((key,index)=><Paragraph key={index} title={titleHandler[key]} content={values[index]} deadline={deadline} isMorning={isMorning} timeSubmitted={!!isMorning?data.morningSubmissionTime:data.eveningSubmissionTime} />)
                }
            </ItemContainer>
        </ContentContainer>
    )
}

export default JournalModalTabsContent
