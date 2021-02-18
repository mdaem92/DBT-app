import React from 'react'
import {ContentContainer,ItemContainer,TitleContainer} from './JournalModalTabsContent.styles'
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
    strongestEmotion2:'Strongest emotion'
}

const JournalModalTabsContent = ({data}) => {
    const keys = Object.keys(data)
    const values = Object.values(data)

    return (
        <ContentContainer>
            <ItemContainer>
                {
                    keys.map((key,index)=><Paragraph key={index} title={titleHandler[key]} content={values[index]}/>)
                }
            </ItemContainer>
        </ContentContainer>
    )
}

export default JournalModalTabsContent
