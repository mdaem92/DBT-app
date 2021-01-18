import styled from 'styled-components'

export const HeaderContainer = styled.div`
    display:flex;
    height:65px;
    flex-direction:row;
    justify-content:space-between;
    /* border:1px solid red; */
    align-items:center;
    transition: all 0.5s ease;
    
    
    .dropdown{
        margin-right:20px;
    }
    .anchor{
        color:black; 
        &:hover{
        color:#1890ff;
        
        /* font-weight:bold; */
        transition: color 0.2s ease;
      }
    }
    .active{
        color:#1890ff;
        /* font-size:20px; */
        font-weight:bold
    }
`
export const IconContainer = styled.div`
    color: #1890ff;
    font-size:30px;
    font-weight:bold;
    margin:20px;
    
`

export const NavContainer = styled.div`

    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    width:300px;
    flex-wrap:wrap
`