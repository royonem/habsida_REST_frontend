export default function SideBar({ users, setUsers, currentUser, setCurrentUser, activeView, setActiveView }) {

    return (
        <div className="col-md-2 mb-4">
            <div className="card shadow-sm p-3">
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeView === "admin" ? "active" : ""}`}
                            onClick={() => setActiveView("admin")}
                        >
                            Admin View
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeView === "user" ? "active" : ""}`}
                            onClick={() => setActiveView("user")}
                        >
                            User View
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}