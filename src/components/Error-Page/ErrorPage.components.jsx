import React from 'react';
import {ErrorPageContainer , ImageContainer ,TextContainer, ErrorImage}from './ErrorPage.styles'
// import {ReactComponent as Logo} from '../../assets/engine-light.svg'
import catError from '../../assets/catError.png'

const ErrorPage = () => {
    
    return (
        <ErrorPageContainer>
            {/* <Logo className={'logo'}/> */}
            {/* <ImageContainer imageUrl={require('../../assets/avatar.png')}/> */}
            <ErrorImage src={catError} alt=''/>
            <TextContainer>Sorry, It appears that I messed something up :( Please try again later</TextContainer>
        </ErrorPageContainer>
    );
};

export default ErrorPage;