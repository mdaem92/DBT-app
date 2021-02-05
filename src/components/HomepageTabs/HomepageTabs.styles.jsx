import {Tabs} from 'antd'
import styled from 'styled-components'

const {TabPane} = Tabs
export const TabPaneContainer = styled((props)=><TabPane {...props}/>)`
    display:flex;
    flex-direction:column;
    /* justify-content:space-evenly; */


`
export const ChartsContainer = styled.div`
    display:flex;
    flex-direction:row;
    /* border: 1px solid red; */

`