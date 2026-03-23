import CreateUserForm from '../components/CreateUserForm.jsx';
import GoBack from '../components/GoBack.jsx';
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: form.username,
                    age: Number(form.age),
                    gender: form.gender,
                    country: form.country,
                    password: form.password,
                    confirmPassword: form.confirmPassword
                })
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("Backend error:", text);
                throw new Error("Register failed"); Í
            }
            navigate("/login");
            alert("Registered successfully!");
        } catch (err) {
            console.error(err);
            alert("Error registering");
        }
    }
    const [form, setForm] = useState({
        id: "",
        username: "",
        age: "",
        gender: "",
        country: "",
        password: "",
        confirmPassword: ""
    })
    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
            <h3 className="mb-4 text-center">Register</h3>
            <CreateUserForm handleSubmit={handleSubmit} handleChange={handleChange} form={form} />
            <div className="text-center mt-3">
                <GoBack />
            </div>
        </div>
    );
}