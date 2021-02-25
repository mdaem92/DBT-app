import {Form} from "antd";
import styled from "styled-components";

export const FormContainer = styled((props)=><Form {...props}/>)`

    width:60vw; 
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-self:center;

    .switch{
        margin:10px 0;
        .ant-switch-inner{
            display: flex;
            justify-content:center;
        }
    }

    .ant-form-item{
        /* justify-content:flex-end; */
        justify-self:center;
    }
    @media screen and (max-width:800px){
        width:80vw;
    }
`


export const ItemRow = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;

`
export const RowContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    width:60vw;
    .ant-picker{
        height: 32px;
    }
    .ant-form-item{
        width:fit-content;
        /* justify-content:flex-end; */
    }
    @media screen and (max-width:800px){
        width:80vw;
    }

`