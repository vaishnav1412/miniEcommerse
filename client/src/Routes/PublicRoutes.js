import React from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObjects } from './RouteObjests';

export const PublicRoutesUser = (props) => {
    if (localStorage.getItem('token')) {
        return <Navigate to={RouteObjects.Home} />;
    } else {
        return props.children;
    }
};

export const PublicRoutesAdmin = (props) => {
    if (localStorage.getItem('admintoken')) {
        return <Navigate to={RouteObjects.AdminHome} />;
    } else {
        return props.children;
    }
};
