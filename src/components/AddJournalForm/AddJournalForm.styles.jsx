import {Form} from "antd";
import styled from "styled-components";

export const FormContainer = styled((props)=><Form {...props}/>)`

    padding:5% 20%; 
    .switch{
        margin:10px 0;
        .ant-switch-inner{
            display: flex;
            justify-content:center;
        }
    }

    .ant-form-item{
        width:40vw;
        justify-content:flex-end;
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
    .ant-picker{
        height: 32px;
    }
    .ant-form-item{
        width:fit-content;
        /* justify-content:flex-end; */
    }

`