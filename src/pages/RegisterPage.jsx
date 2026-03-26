import CreateUserForm from '../components/forms/CreateUserForm.jsx';
import GoBack from '../components/buttons/GoBack.jsx';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { apiFetch, validatePassword } from "../api/client";


export default function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        id: "",
        username: "",
        age: "",
        gender: "",
        country: "",
        password: "",
        confirmPassword: "",
        roleIds: []
    })
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            validatePassword(form.password, form.confirmPassword);
            await apiFetch("/api/auth/register", {
                method: "POST",
                body: {
                    username: form.username,
                    age: Number(form.age),
                    gender: form.gender,
                    country: form.country,
                    password: form.password,
                    confirmPassword: form.confirmPassword
                },
                skipAuth: true
            });
            navigate("/login");
            alert("Registered successfully!");
        } catch (err) {
            console.error(err);
            alert("Error registering.");
        }
    }

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
            <CreateUserForm handleSubmit={handleSubmit} handleChange={handleChange} form={form} setForm={setForm} />
            <div className="text-center mt-3">
                <GoBack />
            </div>
        </div>
    );
}