import React from 'react'
import {Container ,AvatarContainer, Name, AddButton } from './Member.styles'
import {PlusOutlined} from '@ant-design/icons'

const Member = ({uid,photoURL,displayName}) => {
    
    return (
        <Container>
            <AvatarContainer imageUrl={photoURL}/>
            <Name>{displayName}</Name>
            <AddButton type={"primary"} icon={<PlusOutlined/>}/>
        </Container>
    )
}

export default Member
