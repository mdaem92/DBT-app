import React from 'react'
import { Container, HeadlineContainer } from './GoogleLogIn.styles'
import { Button, Divider } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
// import { sigInWithGoogle } from '../../firebase/firebase.utils'
// import useCurrentUser from '../../hooks/useCurrentUser'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { currentUserSelector } from '../../Redux/user/user.selectors'
import { signInStart } from '../../Redux/user/user.actions'

const GoogleLogIn = ({history,signInWithGoogle,currentUser}) => {

    return !!currentUser ?
        (
            <Redirect to={`${history.location.state.url}`}/>
        )
        :
        (
            <Container>
                <HeadlineContainer>Welcome to DBT therapy App</HeadlineContainer>
                <Divider className={'divider'}>Log in to Continue</Divider>
                <Button type={'primary'} icon={<GoogleOutlined />} onClick={signInWithGoogle}>Log in with Google</Button>
            </Container>
        )
}

const mapStateToProps = createStructuredSelector({
    currentUser:currentUserSelector
})

const mapDispatchToProps = (dispatch)=>({
    signInWithGoogle:()=>dispatch(signInStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(GoogleLogIn)
