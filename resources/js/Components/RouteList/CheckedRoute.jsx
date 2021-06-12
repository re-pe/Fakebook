import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUserContext } from '../../Contexts/UserContext';
import { accessType } from './data';

export default function CheckedRoute({ accessibility, children, exact, key, path }) {
    const { userContext } = useUserContext();
    const { user } = userContext;
    const canAccess = (
        (accessibility === accessType.always)
    || (user && accessibility === accessType.requiresLogin)
    || (!user && accessibility === accessType.publicOnly)
    );

    return (
        canAccess ? (
            <Route
                key={key}
                exact={exact}
                path={path}
            >
                {children}
            </Route>
        ) : (
            <Redirect to="/login" />
        )
    );
}
