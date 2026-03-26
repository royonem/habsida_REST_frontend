import { useState } from "react";
import UsersTable from "./UsersTable";
import EditUserForm from "../forms/EditUserForm";
import { apiFetch, validatePassword } from "../../api/client";

export default function UsersListView({ users, setUsers, currentUser, setCurrentUser }) {
    const [editingUser, setEditingUser] = useState(null); // used only for modal
    function handleEditClick(user) {
        setEditingUser(user);
    };
    async function handleEditSubmit(updatedUser) {
        try {
            validatePassword(updatedUser.password, updatedUser.confirmPassword);
            await apiFetch(`/api/admin/users/${updatedUser.id}`, {
                method: "PATCH",
                body: updatedUser
            });
            const updatedUserData = await apiFetch(`/api/admin/users/${updatedUser.id}`);
            setUsers(prev => prev.map(u => (u.id === updatedUserData.id ? updatedUserData : u)));
            if (currentUser?.id === updatedUserData.id) {
                setCurrentUser(updatedUserData);
            }
            setEditingUser(null);
            alert(`Edited user ${updatedUserData.username} successfully!`);
        } catch (err) {
            console.error(err);
            alert("Failed to update user");
        }
    };
    async function handleDelete(user) {
        try {
            await apiFetch(`/api/admin/users/${user.id}`, {
                method: "DELETE"
            });
            setUsers(prev => prev.filter(u => u.id !== user.id));
            alert(`Deleted user ${user.username} successfully!`);
        } catch (err) {
            console.error(err);
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
                                isAdmin={true}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}