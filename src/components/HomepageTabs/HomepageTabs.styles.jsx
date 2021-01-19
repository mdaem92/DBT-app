import {Tabs} from 'antd'
import styled from 'styled-components'

const {TabPane} = Tabs
export const TabPaneContainer = styled((props)=><TabPane {...props}/>)`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    /* border: 1px solid red; */
    /* align-items:center; */

`