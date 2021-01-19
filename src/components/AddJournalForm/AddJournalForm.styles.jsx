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
`


export const ItemContainer = styled.div`
    width: 40vw;

`
export const ItemRow = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;

`