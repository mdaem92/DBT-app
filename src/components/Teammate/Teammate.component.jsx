import React from 'react'
import {Container, ImageContainer, NameContainer} from './Teammate.styles'
import {withRouter} from 'react-router-dom'

const Teammate = ({displayName,id,photoURL,history,match}) => {

    const handleClick = ()=>{
        history.push(`${id}/overview`)
    }
    console.log('history: ',history);
    return (
        <Container>
            <ImageContainer imageURL={photoURL}/>
            <NameContainer type="link" onClick={handleClick} >{displayName}</NameContainer>            
        </Container>
    )
}

export default withRouter(Teammate)
