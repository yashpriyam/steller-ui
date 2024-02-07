import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useUser } from '../redux/actions/userAction';
import UnauthorizedPage from '../pages/unauthorizedPage/unauthorizedPage';
import AllUserPaymentsList from '../pages/[admin]/allUsersPaymentsList/AllUsersPaymentsList';
import { CreateQuestion } from '../pages/[admin]/createQuestion/createQuestion';

const AdminRoutesMap: RoutesMapInterface = Object.freeze({
    "/admin/usersPayments": <AllUserPaymentsList />,
    "/admin/createQuestions":<CreateQuestion/>
});

export const AdminRoutes = () => {
    const { user } = useUser();
    const { isLoggedIn, isAdmin } = user;

 
    return <Routes>
        {
            Object.entries(AdminRoutesMap).map(([path, element]) => (
                <Route key={path} path={path} element={(isLoggedIn && isAdmin) ? element : <UnauthorizedPage/>} />
            ))
        }
    </Routes>
};
