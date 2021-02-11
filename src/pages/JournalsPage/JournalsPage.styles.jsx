import styled from "styled-components";
import {Menu} from 'antd'

export const JournalsContainer = styled.div`
    display:flex;
    /* justify-content:space-evenly; */
    flex-direction:row;
    flex-wrap:wrap;
    gap:20px;
`

export const SidePanelContainer = styled(props=><Menu {...props}/>)`
    height:fit-content;
    color:white;
    .ant-menu-submenu-arrow{
        color:white;
    }
    

`
export const JournalsPageContainer = styled.div`
    display:grid;
    grid-template-rows:1fr;
    grid-template-columns:1fr 5fr;
    column-gap:20px;
    

`
