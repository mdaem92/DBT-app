import React from 'react'
import {Container} from './Teammates.styles'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {  teammatesSelector } from '../../Redux/user/user.selectors'
import Teammate from '../Teammate/Teammate.component'





const Teammates = ({teammates}) => {

    

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
})



export default connect(mapStateToProps)(Teammates)
