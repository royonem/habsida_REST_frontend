import { useState } from "react";
import CreateUserForm from "../forms/CreateUserForm";
import { apiFetch, validatePasswords } from "../../api/client";


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
        try {
            validatePasswords(form.password, form.confirmPassword);
            const createdUser = await apiFetch("/api/admin/users", {
                method: "POST",
                body: {
                    username: form.username,
                    age: Number(form.age),
                    gender: form.gender,
                    country: form.country,
                    password: form.password,
                    confirmPassword: form.confirmPassword
                }
            });
            const usersData = await apiFetch("/api/admin/users", {});
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
            alert(`Created user ${createdUser.username} successfully!`);
        } catch (err) {
            console.error(err);
            alert(`Error creating user: ${err.message}`);
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