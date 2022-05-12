import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("/users", {
                    signal: controller.signal,
                });

                console.log(
                    "======================================",
                    response,
                    "======================================"
                );

                isMounted && setUsers(response.data);
            } catch (error) {
                navigate("/login", {
                    state: { from: location },
                    replace: true,
                });

                console.log(
                    "======================================",
                    error,
                    "======================================"
                );
            }
        };

        getUsers();

        return () => {
            console.log("cleanup");
            isMounted = false;
            controller.abort();
        };
    }, []);

    return (
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>{user?.username}</li>
                    ))}
                </ul>
            ) : (
                <p>No users to display</p>
            )}
            {/* <button onClick={() => refresh()}>Refresh</button> */}
            <br />
        </article>
    );
};
