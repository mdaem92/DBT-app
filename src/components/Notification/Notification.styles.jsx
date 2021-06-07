import styled,{css} from "styled-components";

export const Container = styled.div`
    display:flex;
    flex-direction:row;
`

export const ImageContainer = styled.div`
    background-image:${({imageUrl})=>`url(${imageUrl})`};
    width:20px;
    height:20px;
    border-radius:50%;
    background-size: cover;
    background-position: center;
    margin-right:5px;
    /* justify-content:space-between; */
    justify-self:center;
    align-self:center;
`

export const ContentContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`

export const ButtonsContainer = styled.div`
    display:flex;
    justify-content: space-evenly;
    align-items: center;
    padding:0 5px;
    
    

`