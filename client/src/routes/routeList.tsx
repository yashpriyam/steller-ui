import React from 'react';
import { Routes } from 'react-router-dom';
import { getUnProtectedRoutes } from './unProtectedRoutes';
import { getProtectedRoutes } from './protectedRoutes';

const RouteList: React.FC = () => {
  return (
    <Routes>
      {getUnProtectedRoutes()}
      {getProtectedRoutes()}
    </Routes>
  );
};

export default RouteList;
