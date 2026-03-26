import UsersListView from "./UsersListView";
import CreateUserView from "./CreateUserView";

export default function AdminView({ users, setUsers, activeTab, setActiveTab, currentUser, setCurrentUser }) {
    return (
        <div className="d-flex justify-content-center">
            <div style={{ width: "100%", maxWidth: "800px" }}>
                <ul className="nav nav-tabs mb-3 justify-content-center">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "view" ? "active" : ""}`}
                            onClick={() => setActiveTab("view")}
                        >
                            All Users
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "add" ? "active" : ""}`}
                            onClick={() => setActiveTab("add")}
                        >
                            Add User
                        </button>
                    </li>
                </ul>
                <div>
                    {activeTab === "view" && (
                        <UsersListView
                            users={users}
                            setUsers={setUsers}
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                        />
                    )}
                    {activeTab === "add" && (
                        <CreateUserView
                            setUsers={setUsers}
                            setActiveTab={setActiveTab}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}