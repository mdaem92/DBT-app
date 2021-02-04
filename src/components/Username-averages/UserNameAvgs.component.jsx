import React from 'react'
import {Form, Statistic,} from 'antd'
import {UserNameAvgsContainer , NameContainer ,AvgsContainer} from './UserNameAvgs.styles'
import {FormOutlined , SmileOutlined , FireOutlined} from '@ant-design/icons'

const UserNameAvgs = () => {



    return (
        <UserNameAvgsContainer >
            <NameContainer>Hello user</NameContainer>
            <AvgsContainer>
                <Statistic title={'Entries'} prefix={<FormOutlined/>} value={25} />
                <Statistic title={'Mood Avg'} prefix={<SmileOutlined/>} value={'+'}/>
                <Statistic title={'Tension Avg'} prefix={<FireOutlined/>} value={35}/>
                
            </AvgsContainer>
        </UserNameAvgsContainer>
    )
}

export default UserNameAvgs
