import React from 'react';
import { Routes } from 'react-router-dom';
import { UnProtectedRoutes } from './unProtectedRoutes';
import { ProtectedRoutes } from './protectedRoutes';

const RouteList: React.FC = () => {
  return (
    <>
      <UnProtectedRoutes />
      <ProtectedRoutes />
    </>
  );
};

export default RouteList;
