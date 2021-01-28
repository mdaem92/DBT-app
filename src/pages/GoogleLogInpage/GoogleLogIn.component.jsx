import React from 'react'
import { Container, HeadlineContainer } from './GoogleLogIn.styles'
import { Button, Divider } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { sigInWithGoogle } from '../../firebase/firebase.utils'
import useCurrentUser from '../../hooks/useCurrentUser'
import { Redirect } from 'react-router-dom'

const GoogleLogIn = ({history}) => {
    const currentUser = useCurrentUser()
    return !!currentUser ?
        (
            <Redirect to={`${history.location.state.url}`}/>
        )
        :
        (
            <Container>
                <HeadlineContainer>Welcome to DBT with Bitch and Hoe</HeadlineContainer>
                <Divider className={'divider'}>Log in to Continue</Divider>
                <Button type={'primary'} icon={<GoogleOutlined />} onClick={sigInWithGoogle}>Log in with Google</Button>
            </Container>
        )
}

export default GoogleLogIn
