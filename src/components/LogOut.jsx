import { useNavigate } from "react-router-dom";

export default function LogOut({ label = "Log Out" }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <button className="btn btn-secondary" onClick={handleLogout}>
            {label}
        </button>
    );
}