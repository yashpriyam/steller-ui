import React from 'react';
import { Routes } from 'react-router-dom';
import { UnProtectedRoutes } from './unProtectedRoutes';
import { ProtectedRoutes } from './protectedRoutes';
import { AdminRoutes } from './adminRoutes';

const RouteList: React.FC = () => {
  return (
    <>
      <UnProtectedRoutes />
      <ProtectedRoutes />
      <AdminRoutes />
    </>
  );
};

export default RouteList;
