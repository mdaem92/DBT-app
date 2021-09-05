import styled from "styled-components";
import {Menu } from 'antd'

export const ProfileContainer = styled.div`
    background-color:#0b355c;
    /* height:fit-content; */
    min-height:250px;
    display:flex;
    /* justify-content:space-around; */
    flex-direction:column;
    @media screen and (max-width:800px){
        width:95vw;
        /* margin: auto auto 10px auto; */
        margin-bottom: 10px;
        margin-left: auto;
        margin-right: auto;

    }
    
`


export const ProfileImage = styled.div`
    background-image:${({imageUrl})=>`url(${imageUrl})`};
    width:120px;
    height:120px;
    border-radius:50%;
    background-size: cover;
    background-position: center;
    margin:10px 0;
    justify-self:center;
    align-self:center;
  
`

export const AccountMenu = styled(props => <Menu {...props} />)`
    border-right:unset !important;
    color:white;
    .ant-menu-submenu-arrow{
        color:white;
    }
    .ant-menu{
        .item{
            padding-left:10px
            /* display:none; */

        }
    }
    
`

