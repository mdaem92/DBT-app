import {Tabs} from 'antd'
import styled,{css} from 'styled-components'

const {TabPane} = Tabs
export const TabPaneContainer = styled((props)=><TabPane {...props}/>)`
    display:flex;
    /* flex-direction:column; */
    @media screen and (max-width:800px){
        /* flex-direction:column; */
    }
    flex-direction:column;
    /* border: 1px solid red; */

`
export const ChartsContainer = styled.div`
    grid-row: 2;
    grid-column: 1 span 2;
    display:flex;
    flex-direction:row;
    /* border: 1px solid red; */
    @media screen and (max-width:800px){
        flex-direction:column;
    }

`
