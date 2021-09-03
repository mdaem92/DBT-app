import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    text-align: center;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    /* height:100vh; */
    margin-top:50px;
    .divider{
        padding:10px 100px;
        .ant-divider-inner-text{
            color: #6b6b6b;
            font-size:14px;
        }
    }

`

export const HeadlineContainer = styled.div`
    padding: 10px 20px;
    font-size:40px;

`