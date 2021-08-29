import React from 'react'
import {Tag} from 'antd'
import {Container} from './TagsDisplay.styles'

const TagsDisplay = ({tags}) => {
    return (
        <Container>
            {
                tags?.length && tags.map((tag,index)=><Tag key={index}>{tag}</Tag>)
            }
        </Container>
    )
}

export default TagsDisplay
