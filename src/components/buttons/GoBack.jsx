import { useNavigate } from "react-router-dom";

export default function GoBack({ fallback = "/login", label = "Go Back" }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(fallback);
        }
    };

    return (
        <button className="btn btn-secondary" onClick={handleClick}>
            {label}
        </button>
    );
}