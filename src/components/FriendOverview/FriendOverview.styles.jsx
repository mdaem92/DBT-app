import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    /* justify-content:space-evenly; */
    flex-direction:row;
    flex-wrap:wrap;
    height:fit-content;
    gap:20px;
    /* padding:0px 50px 50px 50px; */
    @media screen and (max-width:800px){
        flex-direction:column;
        /* flex-wrap:nowrap; */
        gap:unset;
        justify-content:center;
        align-items:center;
        row-gap:10px;
       
    }
`