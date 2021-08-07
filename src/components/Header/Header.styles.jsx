import styled from 'styled-components'

export const HeaderContainer = styled.div`
    display:flex;
    height:65px;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    transition: all 0.5s ease;
    
    
    .dropdown{
        margin-right:20px;
        align-self: center;
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

    /* @media screen and (max-width:800px){

    } */
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
    flex-wrap:wrap;
`

export const MobileTopBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    justify-content: center;

`