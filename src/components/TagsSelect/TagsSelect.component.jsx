import React,{useEffect} from 'react'
import { Select } from 'antd'
import {Container} from './TagsSelect.styles'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { tagsSelector } from '../../Redux/user/user.selectors'
import { addTagStart, fetchTagsStart, removeTagStart } from '../../Redux/user/user.actions'

const TagsSelect = ({tags,fetchTags,addTag,removeTag}) => {


    useEffect(() => {
        fetchTags()
    }, [fetchTags])
    const handleChange = (tList) => {
        console.log('on change: ',tList);
        // newTags = tList.map(t=>)
    }

    const handleSelect = (tag)=>{

        console.log('selecting ',tag);
        addTag(tag)
        
        
    }
    const handleDeselect = (tag)=>{
        
        console.log('deselecting ',tag);
        removeTag(tag)

    }
    const { Option } = Select
    
    
    
    return (
        <Container>
            <Select
                mode="tags"
                size={'middle'}
                placeholder="Add a Tag"
                defaultValue={tags}
                onChange={handleChange}
                bordered={false}
                onSelect={handleSelect}
                onDeselect={handleDeselect}
                // dropdownClassName={'ass'}
                dropdownStyle={{display:'none'}}

                style={{ width: '100%' }}
            >
                {tags.map((i,index)=><Option key={index}>{i}</Option>)}
            </Select>
        </Container>

    )
}

const mapStateToProps = createStructuredSelector({
    tags:tagsSelector
})
const mapDispatchToProps = (dispatch)=>({
    fetchTags:()=>dispatch(fetchTagsStart()),
    addTag:(newTag)=>dispatch(addTagStart(newTag)),
    removeTag:(tag)=>dispatch(removeTagStart(tag))
})
export default connect(mapStateToProps,mapDispatchToProps)(TagsSelect)
