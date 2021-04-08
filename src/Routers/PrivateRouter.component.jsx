import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { currentUserSelector } from '../Redux/user/user.selectors'

const PrivateRouter = ({
    currentUser,
    component: Component,
    path,
    ...otherProps
}) => {

    return (

        <Route {...otherProps} component={(props) => (
            !!currentUser ?
                (
                    <Component {...props} />
                )
                :
                (
                    <Redirect 
                        to={{
                            pathname: 'login',
                            state: { url: path }
                        }}
                    />
                )
        )} />
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser:currentUserSelector
})
export default connect(mapStateToProps)(PrivateRouter)
