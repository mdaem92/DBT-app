import React from 'react'
import { Route, Redirect } from 'react-router-dom'

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

export default PrivateRouter
