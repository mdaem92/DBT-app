import styled from 'styled-components'

export const ErrorPageContainer = styled.div`
    display:flex;
    flex-direction:column;
    /* justify-content:space-evenly; */
    align-items:center;
    
`
export const ImageContainer = styled.div`
    margin:50px 0 ;
    height:461px;
    width:820px;
    background-size:cover;
    background-position:center;
    background-image:${({imageUrl})=>`url(${imageUrl})`};
    border: 1px solid red;
`

export const TextContainer = styled.div`
    text-align:center;
    font-size: 46px;
    padding:10px 0;
    color:#0b355c;
    align-self: center;
`

export const ErrorImage = styled.img`

    align-self: center;
    margin:auto;
    /* height:200px;
    width:300px; */
    background-size:cover;
    background-position:center;
`