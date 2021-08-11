import React from 'react'
import { Select } from 'antd'
import {Container} from './TagsSelect.styles'

const TagsSelect = () => {

    const handleChange = () => {

    }
    const { Option } = Select
    
    // for (let i = 10; i < 36; i++) {
    //     children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    // }

    const children = ['Anxiety', 'dermatolomania','panic attack'].map((i,index)=><Option key={index}>{i}</Option>)
    return (
        <Container>
            <Select
                mode="tags"
                size={'middle'}
                placeholder="Add a Tag"
                defaultValue={['Anxiety', 'dermatolomania','panic attack']}
                onChange={handleChange}
                bordered={false}
                

                style={{ width: '100%' }}
            >
                {children}
            </Select>
        </Container>

    )
}

export default TagsSelect
