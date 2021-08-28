import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 60px;
    padding-right: 10px;
    padding-bottom: 10px;
    /* min-width:300px; */
    .ant-select-dropdown.ass{
        /* border: 1px solid grey; */
        /* min-width: max-content; */
        display:none !important;

        .dropdown{
            display:none !important;
    } 

    }
    
    .dropdown{
            display:none !important;
    }

    .ant-select-selection-item{
        color: white;
        background-color:#1890ff ;
    }
    .ant-select-selection-item-remove{
        color: white;

    }
`