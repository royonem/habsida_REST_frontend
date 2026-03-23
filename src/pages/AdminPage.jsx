import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import LogOut from "../components/LogOut";
import UserInfo from "../components/UserInfo";
import AdminView from "../components/AdminView";
import { useLocation } from "react-router-dom";

export default function AdminPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const location = useLocation();
    const defaultTab = location.state?.tab || "view";
    const [activeView, setActiveView] = useState("admin");
    const [activeTab, setActiveTab] = useState(defaultTab);

    useEffect(() => {
        console.log("admin page mounted");
        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/api/user/view", {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setCurrentUser(data))
            .catch(err => console.error(err));

        fetch("http://localhost:8080/api/admin/users", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(async res => {
                if (!res.ok) {
                    const errorText = await res.text();
                    console.error("Backend error:", errorText);
                    throw new Error(errorText);
                }
                return res.json();
            })
            .then(data => setUsers(data))
            .catch(err => {
                console.error("Fetch error:", err);
                setError(err.message);
            });
    }, []);
    if (error) return <div>{error}</div>;

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