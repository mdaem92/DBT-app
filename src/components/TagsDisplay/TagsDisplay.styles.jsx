import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex: auto;
    flex: auto;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    max-width:40% ;
    row-gap: 5px;
    column-gap: 2px;
    margin: 0 20px 5px 5px;

    .ant-tag{
        border: unset;
        background-color: #1890ff;
        color: white;
        border-radius: unset;
    }
`