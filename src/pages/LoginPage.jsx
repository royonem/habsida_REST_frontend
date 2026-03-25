import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm"
import { apiFetch } from "../api/client";

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const data = await apiFetch("/api/auth/login", {
                method: "POST",
                body: {username, password},
                skipAuth: true
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("roles", data.roleNames)
            if ((data.roleNames || []).includes("ROLE_ADMIN")) {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        } catch (err) {
            console.error(err);
            alert("Please try again.");
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
            <LoginForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
            />
            <div className="text-center mt-3">
                <Link to="/register" className="btn btn-secondary w-100">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}