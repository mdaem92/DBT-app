import React,{useEffect} from 'react'
import {Container} from './Teammates.styles'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isTeammatesFetchedSelector, teammatesSelector } from '../../Redux/user/user.selectors'
import Teammate from '../Teammate/Teammate.component'
import { fetchTeammatesStart } from '../../Redux/user/user.actions'





const Teammates = ({teammates}) => {

    // useEffect(() => {
        
    //     if(!isTeammatesFetched){
    //         console.log('fetching teammates');
    //         fetchTeammates()
    //     }
        
    // }, [fetchTeammates,isTeammatesFetched])

    return (
        <Container>
            {
                teammates.map((teammate,index)=><Teammate key={index} {...teammate}/>)
            }
        </Container> 
    )
}



const mapStateToProps = createStructuredSelector({
    teammates:teammatesSelector,
    // isTeammatesFetched:isTeammatesFetchedSelector
})

// const mapDispatchToProps = (dispatch)=>({
//     fetchTeammates:()=>dispatch(fetchTeammatesStart())
// })

export default connect(mapStateToProps)(Teammates)
