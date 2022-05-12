import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import { useLocalStorage } from "../hooks/useLocalStorage";
const LOGIN_URL = "/auth";

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.pathname || "/";

    const [user, resetUser, attributeObj] = useInput("user", "");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const togglePersist = () => {
        setPersist(!persist);
    };

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            setAuth({ user, pwd, roles, accessToken });

            // setUser("");
            resetUser();
            setPwd("");

            // navigate
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <section>
            <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    {...attributeObj}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>

                <div className="persistcheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust this device</label>
                </div>
            </form>
            <p>
                Need an Account?
                <br />
                <span className="line">
                    {/*put router link here*/}
                    <a href="#">Sign Up</a>
                </span>
            </p>
        </section>
    );
};

export default Login;
