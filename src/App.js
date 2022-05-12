import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import LinkPage from "./components/LinkPage";
import Unauthorized from "./components/Unauthorized";
import Home from "./components/Home";
import Lounge from "./components/Lounge";
import Admin from "./components/Admin";
import Editor from "./components/Editor";
import Missing from "./components/Missing";
import { RequireAuth } from "./components/RequireAuth";
import { PersistLogin } from "./components/PersistLogin";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* public routes */}
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="linkpage" element={<LinkPage />} />
                    <Route path="unauthorized" element={<Unauthorized />} />

                    {/* protected routes */}
                    <Route element={<PersistLogin />}>
                        {/* !! test with path props */}
                        <Route element={<RequireAuth allowedRoles={[2001]} />}>
                            <Route path="/" element={<Home />} />
                        </Route>

                        <Route element={<RequireAuth allowedRoles={[1984]} />}>
                            <Route path="editor" element={<Editor />} />
                        </Route>

                        <Route element={<RequireAuth allowedRoles={[5150]} />}>
                            <Route path="admin" element={<Admin />} />
                        </Route>
                        <Route
                            element={
                                <RequireAuth allowedRoles={[1984, 5150]} />
                            }
                        >
                            <Route path="lounge" element={<Lounge />} />
                        </Route>
                    </Route>

                    {/* catch all */}
                    <Route path="*" element={<Missing />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
