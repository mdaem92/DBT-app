// import React from 'react'
import styled from 'styled-components'

export const Container= styled.div`
    display:grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: 2fr repeat(2,3fr);
    /* height:100vh ; */
    @media screen and (max-width:800px){
        grid-template-columns: 1fr;
        grid-template-rows: auto; 
    }
`
export const ChartContainer = styled.div`
    /* border:1px solid black; */
    /* width:50%; */
    /* height:300px; */
`
export const UserNameAvgsContainer = styled.div`
    grid-column:1 /span 1;
    grid-row:1/span 1;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:25px;
`
export const DateAndTimeContainer = styled.div`
    grid-column:2 / span 1;
    grid-row:1/span 1;
    display:flex;
    justify-content:center;
    align-items:center;
    @media screen and (max-width:800px){
        grid-column:1 / span 1;
        grid-row:2/span 1;
    }
`
export const TabsContainer = styled.div`
    grid-column:1 / span 3;
    grid-row:2/span 2;
    /* background-color:grey; */
    padding:0px 36px;
    @media screen and (max-width:800px){
        grid-column:1 / span 1;
        grid-row:3/span 1;
        padding:0 5px;
    }

`