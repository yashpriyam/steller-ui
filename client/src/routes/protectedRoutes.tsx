import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuestionPage from '../pages/questionPage/questionPage';
import ProfilePage from '../pages/profilePage/profilePage';
import { useUser } from '../redux/actions/userAction';
import UnauthorizedPage from '../pages/unauthorizedPage/unauthorizedPage';
import SchedulePage from "../pages/schedulePage/schedulePage";
import { Dashboard } from "../pages/dashboard/dashboard";
import DayPage from "../pages/dayPage/dayPage";
import DayContentPage from "../pages/dayContextPage/dayContextPage";
import VideosPage from "../pages/videosPage/videosPage";
import UserPaymentPage from '../pages/userPaymentPage/userPaymentPage';

const protectedRoutesMap: RoutesMapInterface = Object.freeze({
    "/questions": <QuestionPage />,
    "/profile": <ProfilePage />,
    "/schedule": <SchedulePage />,
    "/dashboard": <Dashboard />,
    "/day/:dayNumber": <DayPage />,
    "/day/:dayNumber/:dayContent": <DayContentPage />,
    "/question": <QuestionPage />,
    "/videos": <VideosPage />,
    "/userPayment": <UserPaymentPage/>
});

export const ProtectedRoutes = () => {
    const { user } = useUser();
    const { isLoggedIn } = user;
    return <Routes>
        {
            Object.entries(protectedRoutesMap).map(([path, element]) => (
                <Route key={path} path={path} element={isLoggedIn ? element : <UnauthorizedPage />} />
            ))
        }
    </Routes>
};
