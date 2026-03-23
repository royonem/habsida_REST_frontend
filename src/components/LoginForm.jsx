import { useState } from "react";

export default function LoginForm({ username, password, setUsername, setPassword, handleLogin }) {
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div style={{ width: "100%", maxWidth: "400px" }}>
            <h2 className="text-center mb-4">Please sign in</h2>
            {errorMessage && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {errorMessage}
                    <button type="button" className="btn-close" onClick={() => setErrorMessage("")}></button>
                </div>
            )}
            <form onSubmit={handleLogin} className="card p-4 shadow-sm bg-white rounded">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Sign in
                </button>
            </form>
        </div>
    );
}