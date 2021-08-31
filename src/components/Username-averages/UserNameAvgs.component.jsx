import React from 'react'
import { Statistic} from 'antd'
import {UserNameAvgsContainer , NameContainer ,AvgsContainer} from './UserNameAvgs.styles'
import {FormOutlined , SmileOutlined , FireOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { entriesCountSelector, moodsAverageSelector, tensionsAverageSelector } from '../../Redux/journals/journals.selectors'
import { currentUserSelector } from '../../Redux/user/user.selectors'

const moodHandler = {
    '2': '++',
    '1': '+',
    '0': '+-',
    '-1': '-',
    '-2': '--'
}
const UserNameAvgs = ({entriesCount,moodAverage,tensionAverage,currentUser}) => {
    // const currentUser = useCurrentUser()
    
    return (
        <UserNameAvgsContainer >
            <NameContainer>{currentUser && `Hi ${currentUser.displayName}`}</NameContainer>
            <AvgsContainer>
                <Statistic title={'Entries'} prefix={<FormOutlined/>} value={entriesCount} />
                <Statistic title={'Mood Avg'} prefix={<SmileOutlined/>} value={moodHandler[moodAverage]}/>
                <Statistic title={'Tension Avg'} prefix={<FireOutlined/>} value={tensionAverage || 0}/>
                
            </AvgsContainer>
        </UserNameAvgsContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    entriesCount:entriesCountSelector,
    moodAverage:moodsAverageSelector,
    tensionAverage:tensionsAverageSelector,
    currentUser:currentUserSelector
})

export default connect(mapStateToProps)(UserNameAvgs)
