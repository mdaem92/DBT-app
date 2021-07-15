import React from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isFriendshipConfirmedSelector } from '../../Redux/user/user.selectors';
import { Container } from './FriendOverviewPage.styles'
import FriendOverview from '../../components/FriendOverview/FriendOverview.component.jsx';
import { Redirect } from 'react-router-dom'



const FriendOverviewPage = ({ match,history }) => {


    const { uid: friendID } = match.params
    const isFriendshipConfirmed = useSelector((state) => isFriendshipConfirmedSelector(state, friendID))

    return isFriendshipConfirmed ?
        (
            <FriendOverview id={friendID} />
        )
        :
        (
            <Redirect
                to={{
                    pathname: '/journals'
                    // search: "?utm=your+face",
                    // state: { url: currentLocation }
                }}
            />
        )
}



export default withRouter(FriendOverviewPage)
