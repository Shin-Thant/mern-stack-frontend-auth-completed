import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        console.log("auth", auth);
    }, [auth]);

    return auth?.roles?.find((role) => allowedRoles.includes(role)) ? (
        <Outlet />
    ) : auth?.user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};
