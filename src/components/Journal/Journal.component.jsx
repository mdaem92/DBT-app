import React from 'react'
import {JournalContainer} from './Journal.styles'

const Journal = ({date}) => {
    return (
        <JournalContainer>
            {date}
        </JournalContainer>
    )
}

export default Journal 