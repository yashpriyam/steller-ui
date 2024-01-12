import React from 'react';
import { Route } from 'react-router-dom';
import QuestionPage from '../pages/questionPage/questionPage';

const protectedRoutesMap: RoutesMapInterface = Object.freeze({
    "/questions": <QuestionPage />
});

export const getProtectedRoutes = (): React.ReactNode[] => {
    /* TODO:@dhananjay - Need to add login check for protected routes  */
    return Object.entries(protectedRoutesMap).map(([path, element]) => (
        <Route key={path} path={path} element={element} />
    ));
};
