import React from 'react';
import { Route } from 'react-router-dom';
import { Dashboard } from "../components/dashboardComponent/dashboard/dashboard";

const protectedRoutesMap: RoutesMapInterface = Object.freeze({
    "/dashboard": <Dashboard />,
});

export const getProtectedRoutes = (): React.ReactNode[] => {
    /* TODO:@dhananjay - Need to add login check for protected routes  */
    return Object.entries(protectedRoutesMap).map(([path, element]) => (
        <Route key={path} path={path} element={element} />
       
        
    ));
};
