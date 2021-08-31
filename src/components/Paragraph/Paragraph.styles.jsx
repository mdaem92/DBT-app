import styled, { css } from "styled-components";

export const ParagraphContainer = styled.div`

`
export const Title = styled.div`
    color:'grey';
    font-size:10px;
    
`
export const ContentContainer = styled.p`
    ${props => props.isDeadlineMissed && css`
        color:red;
    `};
`