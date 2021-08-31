import React from 'react';
import {ErrorPageContainer  ,TextContainer, ErrorImage}from './ErrorPage.styles'
// import {ReactComponent as Logo} from '../../assets/engine-light.svg'
import catError from '../../assets/catError.png'

const ErrorPage = () => {
    
    return (
        <ErrorPageContainer>
            {/* <Logo className={'logo'}/> */}
            {/* <ImageContainer imageUrl={require('../../assets/avatar.png')}/> */}
            <ErrorImage src={catError} alt=''/>
            <TextContainer>I might have chewed off some cables :( Try again later</TextContainer>
        </ErrorPageContainer>
    );
};

export default ErrorPage;