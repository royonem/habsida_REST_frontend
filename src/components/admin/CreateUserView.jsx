import { useState } from "react";
import CreateUserForm from "../forms/CreateUserForm";
import { apiFetch, validatePassword } from "../../api/client";


export default function CreateUserView({ setUsers, setActiveTab }) {
    const [form, setForm] = useState({
        username: "",
        age: "",
        gender: "",
        country: "",
        password: "",
        confirmPassword: "",
        roleIds: []
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
            validatePassword(form.password, form.confirmPassword);
            await apiFetch("/api/admin/users", {
                method: "POST",
                body: {
                    username: form.username,
                    age: Number(form.age),
                    gender: form.gender,
                    country: form.country,
                    password: form.password,
                    confirmPassword: form.confirmPassword,
                    roleIds: form.roleIds
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
            alert(`Created user ${form.username} successfully!`);
        } catch (err) {
            console.error(err);
            alert(`Error creating user: ${err.message}`);
        }
    }
    return (
        <CreateUserForm
            form={form}
            setForm={setForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isAdmin={true}
        />
    );
}