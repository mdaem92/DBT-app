import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 60px;
    padding-right: 10px;
    padding-bottom: 10px;
    /* min-width:300px; */
    
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