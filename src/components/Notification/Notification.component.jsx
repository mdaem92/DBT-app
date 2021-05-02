import React from 'react'
import {Container ,ImageContainer, ContentContainer} from './Notification.styles'

const Notification = ({senderName,senderId,photoURL,type,responded,currentUser,currentNotifications}) => {
    const labels = {
        "ADD_REQUEST":"requested access",
        "SUBMITTED_REPORT":"submitted report",
        "MISSED_DEADLINE":"missed deadline"
    }


    return (
        <Container>
            <ImageContainer imageUrl={photoURL} rel={'noreferer'}/>
            <ContentContainer>
                {`${senderName} has ${labels[type]}`} 
            </ContentContainer>
        </Container>
    )
}


export default Notification
