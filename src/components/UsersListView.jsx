import { useState } from "react";
import UsersTable from "../components/UsersTable";
import EditUserForm from "./EditUserForm";

export default function UsersListView({ users, setUsers }) {
    const [editingUser, setEditingUser] = useState(null);
    function handleEditClick(user) {
        setEditingUser(user);
    };
    async function handleEditSubmit(updatedUser) {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8080/api/admin/users/${updatedUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedUser)
        });

        if (res.ok) {
            setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
            setEditingUser(null);
        } else {
            alert("Failed to update user");
        }
        alert("Edited user successfully!");
    };
    async function handleDelete(user) {
        const token = localStorage.getItem("token");
        const res = await fetch(
            `http://localhost:8080/api/admin/users/${user.id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (res.ok) {
            setUsers(prev => prev.filter(u => u.id !== user.id));
        } else {
            alert("Failed to delete user");
        }
    }
    return (
        <>
            <UsersTable users={users} onEdit={handleEditClick} onDelete={handleDelete} />

            {editingUser && (
                <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-4">
                            <h5>Edit User</h5>

                            <EditUserForm
                                user={editingUser}
                                onSave={handleEditSubmit}
                                onCancel={() => setEditingUser(null)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}