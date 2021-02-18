import React from 'react'
import {ParagraphContainer,Title,ContentContainer} from './Paragraph.styles'

const moodHandler = {
    '2': '++',
    '1': '+',
    '0': '+-',
    '-1': '-',
    '-2': '--'
}
const Paragraph = ({title,content}) => {
    return (
        <ParagraphContainer>
            <Title>{title}</Title>
            {   
                title==='Mood'?
                <ContentContainer>{moodHandler[content]}</ContentContainer>
                :
                <ContentContainer>{content}</ContentContainer>

            }
        </ParagraphContainer>
    )
}

export default Paragraph
