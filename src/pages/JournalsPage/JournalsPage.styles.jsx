import styled from "styled-components";
import { Menu } from 'antd'

export const JournalsContainer = styled.div`
    display:flex;
    grid-area: journals;
    /* justify-content:space-evenly; */
    flex-direction:row;
    flex-wrap:wrap;
    height:fit-content;
    gap:20px;
    @media screen and (max-width:800px){
        flex-direction:column;
        /* flex-wrap:nowrap; */
        gap:unset;
        justify-content:center;
        align-items:center;
        row-gap:10px;
       
    }
   
`

export const SidePanelContainer = styled(props => <Menu {...props} />)`
    height:fit-content;
    color:white;
    .ant-menu-submenu-arrow{
        color:white;
    }

    @media screen and (max-width:800px){

        width:95vw;
        margin:10px 0;
        align-self:center;
   
    }


`
export const JournalsPageContainer = styled.div`
    display:grid;
    grid-template-rows:1fr 10%;
    grid-template-columns:15% 5fr;
    grid-template-areas: "sidepanel journals"
                         "sidepanel journals"
                         "sidepanel pagination"
    ;
    column-gap:20px;
    

@media screen and (max-width:800px){
    display:flex;
    flex-direction:column;
    justify-content:center;
    /* width:95%;
    align-self: center;
    justify-self: center; */
}
`

export const SidePanelProfileContainer = styled.div`
    grid-area: sidepanel;
    /* width:100px; */
`

export const PaginationContainer = styled.div`
    grid-area: pagination;
    display: flex;
    justify-self: center;
    margin: 20px auto;
`
