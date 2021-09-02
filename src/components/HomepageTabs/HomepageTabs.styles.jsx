import {Tabs} from 'antd'
import styled from 'styled-components'

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
export const EmptyScreen = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10vh 0;
    

`
