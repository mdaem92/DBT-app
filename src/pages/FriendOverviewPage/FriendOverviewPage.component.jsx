import React from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isFriendshipConfirmedSelector } from '../../Redux/user/user.selectors';
import {Container} from './FriendOverviewPage.styles'
import FriendOverview from '../../components/FriendOverview/FriendOverview.component.jsx';



const FriendOverviewPage = ({ match }) => {


    const { uid: friendID } = match.params
    const isFriendshipConfirmed = useSelector((state) => isFriendshipConfirmedSelector(state, friendID))

    return isFriendshipConfirmed ?
        (
            <FriendOverview id={friendID}/>
        )
        :
        (
            <div>
                Not authorized
            </div>
        ) 
}



export default withRouter(FriendOverviewPage)
