import React from 'react';
import { Route } from 'react-router-dom';

const protectedRoutesMap: RoutesMapInterface = Object.freeze({
    // Add your protected routes here
});

export const getProtectedRoutes = (): React.ReactNode[] => {
    /* TODO:@dhananjay - Need to add login check for protected routes  */
    return Object.entries(protectedRoutesMap).map(([path, element]) => (
        <Route key={path} path={path} element={element} />
    ));
};
