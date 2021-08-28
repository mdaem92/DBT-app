import styled from "styled-components";

export const JournalContainer = styled.div`
    width:250px;
    height:250px;
    /* border:1px solid #1890ff; */
    display:grid;
    /* grid-template-columns */
    grid-template-rows:1fr 2fr 2fr;
    background: rgb(11,53,92);
    /* background: linear-gradient(0deg, rgba(11,53,92,1) 0%, rgba(255,255,255,1) 72%); */
    @media screen and (max-width:800px){
        width:95vw;
    }

` 

export const SummaryContainer = styled.div`
    /* border:1px solid #1890ff; */
    margin:15px 10px;
    height:100px;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    /* background-color:white; */

`
export const ModalButtonArea = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    .ant-btn{
        /* display:none; */
        border-radius: 100px;
    }
    

`
export const DateContainer = styled.div`

    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
`


