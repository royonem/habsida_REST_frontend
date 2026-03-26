import { useEffect, useState } from "react";
import SideBar from "../components/buttons/SideBar";
import LogOut from "../components/buttons/LogOut";
import UserInfo from "../components/UserInfo";
import AdminView from "../components/admin/AdminView";
import { useLocation } from "react-router-dom";
import { apiFetch } from "../api/client";

export default function AdminPage() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const location = useLocation();
    const defaultTab = location.state?.tab || "view";
    const [activeView, setActiveView] = useState("admin");
    const [activeTab, setActiveTab] = useState(defaultTab);

    useEffect(() => {
        async function loadData() {
            try {
                const [userData, usersData] = await Promise.all([
                    apiFetch("/api/user/view"),
                    apiFetch("/api/admin/users")]);
                setCurrentUser(userData);
                setUsers(usersData);
            } catch (err) {
                console.error("Fetch error:", err);
                alert("Error fetching data.");
            }
        }
        loadData();
    }, []);

        return (
        <div>
            <div className="d-flex">
                <SideBar
                    users={users}
                    setUsers={setUsers}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    activeView={activeView}
                    setActiveView={setActiveView}
                />
                <div className="col-md-9">
                    {activeView === "admin" && (
                        <>
                            <div className="card shadow-sm mb-4 p-3 bg-light rounded">
                                <h2 className="mb-0 text-center">Admin Panel</h2>
                            </div>
                            <div className="p-3 bg-white shadow-sm rounded">
                                <AdminView
                                    users={users}
                                    setUsers={setUsers}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                    currentUser={currentUser}
                                    setCurrentUser={setCurrentUser}
                                />
                            </div>
                        </>
                    )}

                    {activeView === "user" && currentUser && (
                        <>
                            <div className="card shadow-sm mb-4 p-3 bg-light rounded">
                                <h2 className="mb-0 text-center">User Panel</h2>
                            </div>
                            <UserInfo user={currentUser} />
                        </>
                    )}
                </div>
            </div>
            <div className="mt-auto p-3">
                <LogOut />
            </div>
        </div>
    );
}