import React from 'react'
import {Container, ImageContainer, NameContainer} from './Teammate.styles'
import {withRouter} from 'react-router-dom'

const Teammate = ({displayName,id,photoURL,history,match,location}) => {

    const handleClick = ()=>{
        console.log('history: ',history);
        console.log('match: ',match);
        console.log('location: ',location);

        console.log(match.params.uid,id);
        if(match.params.uid!==id){
            history.push(`/${id}/overview`)
        }
        
    }
    // console.log('history: ',history);
    return (
        <Container>
            <ImageContainer imageURL={photoURL}/>
            <NameContainer type={"link"} onClick={handleClick} >{displayName}</NameContainer>            
        </Container>
    )
}

export default withRouter(Teammate)
