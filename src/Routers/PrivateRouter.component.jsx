import React, { useState, useEffect , useRef } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { auth } from '../firebase/firebase.utils'
import useCurrentUser from '../hooks/useCurrentUser'

const PrivateRouter = ({
    currentUser,
    component: Component,
    path,
    ...otherProps
}) => {


    return (

        <Route {...otherProps} component={(props) => (
            !!currentUser?
                (
                    <Component {...props} />
                )
                :
                (
                    <Redirect to={{
                        pathname: 'login',
                        state: { url: path }
                    }} />
                )
        )} />
    )
}

export default PrivateRouter
