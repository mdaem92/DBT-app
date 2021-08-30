import {Form} from "antd";
import styled from "styled-components";

export const FormContainer = styled((props)=><Form {...props}/>)`

    width:60vw; 
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-self:center;
    margin-top: 20px;

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
    /* *{
        border-radius: 5%;
    } */
    
    
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
    .ant-input-number{
        width: 25vw;
    }
    /* .ant-form-item .ant-select, .ant-form-item .ant-cascader-picker{
        width:300px;

    } */
    @media screen and (max-width:800px){
        width:80vw;
    }

`