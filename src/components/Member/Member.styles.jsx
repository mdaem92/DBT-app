import styled from "styled-components";
import {Button} from 'antd'

export const Container = styled.div`
    display:flex;
    flex-direction:row;
    /* justify-content:space-between; */
    align-items:center;
    padding-left:50px;
`

export const AvatarContainer = styled.div`
    background-image:${({imageUrl})=>`url(${imageUrl})`};
    width:20px;
    height:20px;
    border-radius:50%;
    background-size: cover;
    background-position: center;
    margin:2px 0;
    justify-self:center;
    align-self:center;

`
export const Name = styled.div`
    font-weight:bold;
`
export const AddButton = styled(Button)`
    
`

