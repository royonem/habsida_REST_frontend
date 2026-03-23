import { useState } from "react";
import CreateUserForm from "../components/CreateUserForm";

export default function CreateUserView({ setUsers, setActiveTab }) {
    const [form, setForm] = useState({
        username: "",
        age: "",
        gender: "",
        country: "",
        password: "",
        confirmPassword: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

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
                throw new Error("Register failed");
            }
            const token = localStorage.getItem("token");
            const usersRes = await fetch("http://localhost:8080/api/admin/users", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const usersData = await usersRes.json();
            setUsers(usersData);
            setForm({
                username: "",
                age: "",
                gender: "",
                country: "",
                password: "",
                confirmPassword: ""
            });
            setActiveTab("view");
            alert("Created user successfully!");

        } catch (err) {
            console.error(err);
            alert("Error creating user");
        }
    }

    return (
        <CreateUserForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}