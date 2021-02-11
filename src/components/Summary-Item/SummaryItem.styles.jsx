import styled from 'styled-components'

export const SummaryItemContainer = styled.div`
    /* padding:5px 10px; */
    display:flex;
    flex-direction:row;
    


`
export const ItemContainer = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    /* background-color:#f7f7f7; */
    flex-grow:1;

    :last-child{
        border-right:none;
    }
    border-right:1px solid #979797;
    

`

export const ValueContainer = styled.div`
    color:white;

`

