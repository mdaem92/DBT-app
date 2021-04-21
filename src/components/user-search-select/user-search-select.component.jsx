import React, { useState, useEffect } from 'react'
import { Select, Button } from 'antd'
import { Container } from './user-search-select.styles'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { sendRequestStart } from '../../Redux/user/user.actions'
import { membersListSelector } from '../../Redux/members/members.selectors'
import Member from '../Member/Member.component'

const UserSearchSelect = ({ sendRequest, members }) => {


    const { Option } = Select
    const [state, setstate] = useState("")

    const handleChange = (value) => {
        console.log(value);
        setstate(value)
        // sendRequest(value)
    }

    const handleRequest = (value) => {

        sendRequest(value)
    }

    useEffect(() => {
        console.log("state change: ", state);

    }, [state])

    return (
        <Container>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                onChange={handleChange}
                onSelect={handleRequest}
                filterOption={(input, option) => 
                    // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // console.log(option.value)
                    option.value.indexOf(input) >=0
                    
                }
                // filterOption
                filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
            >
                {/* <Option value="132312321312"> Jack</Option>
                <Option value="2312333223"> mamad</Option>
                <Option value="4443545666"> abbas</Option> */}
                {members.map(({uid,displayName},index)=><Option key={index} value={uid}>{displayName}</Option>)}
            </Select>
            {/* {
                members.map((member,index)=><div key={index}><Member {...member} /></div>)
            } */}


        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    members: membersListSelector
})

const mapDispatchToProps = (dispatch) => ({
    sendRequest: (id) => dispatch(sendRequestStart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchSelect)
