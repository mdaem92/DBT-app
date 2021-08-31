import React, { useState, useEffect } from 'react'
import { ProfileContainer, ProfileImage, AccountMenu } from './UserProfile.styles'
// import useCurrentUser from '../../hooks/useCurrentUser'
import { Menu, message, Modal, DatePicker } from 'antd'
import { LogoutOutlined, SettingFilled, KeyOutlined, TeamOutlined, PlusOutlined, SlidersOutlined, UserOutlined, FieldTimeOutlined, TagsOutlined } from '@ant-design/icons'
import { createStructuredSelector } from 'reselect'
import { currentUserSelector, isTagsFetchedSelector, isTeammatesFetchedSelector } from '../../Redux/user/user.selectors'
import { connect } from 'react-redux'
import { fetchTagsStart, fetchTeammatesStart, signOutStart } from '../../Redux/user/user.actions'
import UserSearchSelect from '../user-search-select/user-search-select.component'
import { notifErrorSelector } from '../../Redux/notifications/notifications.selectors'
import { resetError } from '../../Redux/notifications/notifications.actions'
import Teammates from '../Teammates/Teammates.component'
import { setFieldValue } from '../../Redux/journals/journals.actions'
import { withRouter } from 'react-router-dom'
import { setFriendDataFieldValue, toggleView } from '../../Redux/friendOverviewPage/friendOverviewPage.actions'
import { friendOverviewDateFromSelector, friendOverviewDateToSelector, friendOverviewPageViewSelector } from '../../Redux/friendOverviewPage/friendsOverviewPage.selectors'
import DeadlineSwitchSetting from '../Deadline-Switch-setting/DeadlineSwitchSetting.component'
import { journalsFiltersSelector } from '../../Redux/journals/journals.selectors'
import moment from 'moment'
import TagsSelect from '../TagsSelect/TagsSelect.component'


const UserProfile = ({
    currentUser,
    logOut,
    notifError,
    resetError,
    setFieldValue,
    match,
    showGraph,
    toggleView,
    setFriendDataFieldValue,
    ownFilters,
    friendDateFrom,
    friendDateTo,
    fetchTeammates,
    isTeammatesFetched,
    isTagsFetched,
    fetchTags
}) => {
    const { SubMenu } = Menu
    const [isExtended, setExtended] = useState(false)
    const [dateRange, setDateRange] = useState({
        dateFrom: null,
        dateTo: null
    })

    const handleMoveProfileImage = () => {
        setExtended(!isExtended)
    }


    const copyToClipBoard = (e) => {
        const text = e.item.props.children[1]
        navigator.clipboard.writeText(text).then(() => {
            message.success('key copied to clipboard', 2)
        })
    }

    useEffect(() => {
        const clearError = () => {
            resetError()
        }
        if (!!notifError) {
            Modal.error({
                title: 'Error finding user',
                content: 'The user with the given public key does not exist',
                onOk: clearError

            })
        }
    }, [notifError, resetError])

    useEffect(() => {
        if (match.path === "/:uid/overview") {
            setDateRange({
                dateFrom: !!friendDateFrom ? moment(friendDateFrom) : null,
                dateTo: friendDateTo ? moment(friendDateTo) : null
            })
        } else {
            setDateRange({
                dateFrom: !!ownFilters.dateFrom ? moment(ownFilters.dateFrom) : null,
                dateTo: !!ownFilters.dateTo ? moment(ownFilters.dateTo) : null
            })
        }

    }, [friendDateFrom,friendDateTo,match.path,ownFilters.dateFrom,ownFilters.dateTo])

    useEffect(() => {

        if (!isTeammatesFetched) {
            console.log('fetching teammates');
            fetchTeammates()
        }

    }, [fetchTeammates, isTeammatesFetched])

    useEffect(() => {

        if (!isTagsFetched) {
            console.log('fetching tags');
            fetchTags()
        }

    }, [fetchTags, isTagsFetched])

    const handleDateChange = (fieldName, date, dateString) => {
        console.log('uid: ', match.params);
        console.log(dateString);
        if (match.path === '/:uid/overview') {
            console.log('uid: ', match.params);
            setFriendDataFieldValue(fieldName, dateString)
        } else {
            setFieldValue(fieldName, dateString)

        }
        if (dateString !== '') {
            setDateRange({
                ...dateRange,
                [fieldName]: moment(dateString)

            })
        } else {
            setDateRange({
                ...dateRange,
                [fieldName]: null
            })
        }


    }

    const handleToggleFriendView = () => {
        toggleView()
    }

    const handleDisableDate = (currentDate)=>{
        return dateRange.dateFrom==null?false:dateRange.dateFrom>=currentDate
    }

    return (
        <div>
            <ProfileContainer>
                <ProfileImage
                    imageUrl={currentUser?.photoURL}
                    // imageUrl={auth.currentUser?.photoURL} 

                    isHidden={isExtended}
                    referrerpolicy="no-referrer"
                />
                <AccountMenu
                    mode='inline'
                    style={{ backgroundColor: '#0b355c' }}
                >
                    <SubMenu key="settings" icon={<SettingFilled />} title="Account Settings" color={'white'} onTitleClick={handleMoveProfileImage}>
                        <SubMenu key="publicKey" icon={<KeyOutlined />} title={'Public Key'}>
                            <Menu.Item key="1" onClick={copyToClipBoard}>{currentUser?.uid}</Menu.Item>
                        </SubMenu>
                        <SubMenu key="teammates" icon={<TeamOutlined />} title={'View Teammates'}>
                            <Teammates />
                        </SubMenu>
                        <SubMenu key="addNew" icon={<PlusOutlined />} title={'Add teammate'}>
                            <UserSearchSelect />
                        </SubMenu>
                        <SubMenu key="myDeadlines" icon={<FieldTimeOutlined />} title={'My Deadlines'}>
                            <DeadlineSwitchSetting />
                        </SubMenu>
                        <SubMenu key="myTags" icon={<TagsOutlined />} title={'My Tags'}>
                            <TagsSelect />
                        </SubMenu>
                    </SubMenu>
                    {
                        match.path === '/:uid/overview' &&
                        <Menu.Item key='friendOverviewTab' icon={<UserOutlined />} onClick={handleToggleFriendView}>
                            View friend's {showGraph ? 'Journals' : 'Data graph'}
                        </Menu.Item>

                    }
                    <SubMenu key='filters' icon={<SlidersOutlined />} title={'Filter Journals'} color={'white'} onTitleClick={handleMoveProfileImage}>
                        <Menu.Item key='dateFrom'>
                            <DatePicker placeholder={'Date From'} onChange={handleDateChange.bind(this, 'dateFrom')} bordered={false} value={dateRange.dateFrom} disabledDate={handleDisableDate} />
                        </Menu.Item>
                        <Menu.Item key='dateTo'>
                            <DatePicker placeholder={'Date To'} onChange={handleDateChange.bind(this, 'dateTo')} bordered={false} value={dateRange.dateTo} disabledDate={handleDisableDate}/>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item
                        key="logout"
                        icon={<LogoutOutlined />}
                        onClick={logOut}
                        color={'white'}
                    >
                        Log out
                    </Menu.Item>

                </AccountMenu>
            </ProfileContainer>

        </div>

    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector,
    notifError: notifErrorSelector,
    showGraph: friendOverviewPageViewSelector,
    ownFilters: journalsFiltersSelector,
    friendDateFrom: friendOverviewDateFromSelector,
    friendDateTo: friendOverviewDateToSelector,
    isTeammatesFetched: isTeammatesFetchedSelector,
    isTagsFetched: isTagsFetchedSelector

})

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(signOutStart()),
    resetError: () => dispatch(resetError()),
    setFieldValue: (name, value) => dispatch(setFieldValue(name, value)),
    toggleView: () => dispatch(toggleView()),
    setFriendDataFieldValue: (field, value) => dispatch(setFriendDataFieldValue(field, value)),
    fetchTeammates: () => dispatch(fetchTeammatesStart()),
    fetchTags: () => dispatch(fetchTagsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile))
