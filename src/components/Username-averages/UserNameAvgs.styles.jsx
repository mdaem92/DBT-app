import styled from "styled-components";

export const UserNameAvgsContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;

`
export const NameContainer = styled.div`
    font-size:25px;
`
export const AvgsContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    .ant-statistic{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        margin-left:10px;
        margin-right:10px;
    }
    .ant-statistic-title{
        font-size:10px;
        margin:0;
    }
`