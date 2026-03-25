import { useEffect, useState } from "react";
import LogOut from "../components/buttons/LogOut";
import UserInfo from "../components/UserInfo";
import { apiFetch } from "../api/client";

export default function UserPage() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function loadData() {
            try {
                const data = await apiFetch("/api/user/view");
                setUser(data);
            } catch (err) {
                console.error("Fetch error:", err);
                alert("Error fetching data.");
            }
        }
        loadData();
    }, []);
    return (
        <div>
            {user && <UserInfo user={user} />}
            <LogOut />
        </div>
    );
}