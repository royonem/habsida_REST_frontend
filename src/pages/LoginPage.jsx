import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm"

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            if (!res.ok) {
                const err = await res.json();
                alert(err.message || "Login failed");
                return;
            }
            const data = await res.json();
            localStorage.setItem("token", data.token);

            if ((data.roleNames || []).includes("ROLE_ADMIN")) {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        } catch (err) {
            console.error(err);
            alert("Network error or server is down");
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