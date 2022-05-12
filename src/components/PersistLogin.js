import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

export const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth, persist } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => (isMounted = false);
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading]);

    // * When we refresh the page, if persist is true, then loading text will be shown and then child components will be shown.
    // * when persist is false, then outlet will directly be shown.
    // * refresh() function will run anyway.

    return (
        <>
            {persist ? (
                isLoading ? (
                    <h3>Loading...</h3>
                ) : (
                    <Outlet />
                )
            ) : (
                <Outlet />
            )}
        </>
    );
};
