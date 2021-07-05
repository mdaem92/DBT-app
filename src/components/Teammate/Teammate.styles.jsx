import styled from "styled-components";
import {Button} from 'antd'

export const Container = styled.div`

display:flex;
flex-direction: row;
align-items: center;
row-gap: 10px;
padding-left:60px;
`
export const NameContainer = styled(Button)`

`
export const ImageContainer = styled.div`
    background-image: ${({imageURL})=>`url(${imageURL})`};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    /* border: 1px solid red; */
    margin:0 10px;
`