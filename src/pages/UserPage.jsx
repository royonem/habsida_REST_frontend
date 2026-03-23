import { useEffect, useState } from "react";
import LogOut from "../components/LogOut";
import UserInfo from "../components/UserInfo";

export default function UserPage() {
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("user page mounted");
        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/api/user/view", {
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
            .then(data => setUser(data))
            .catch(err => {
                console.error("Fetch error:", err);
                setError(err.message);
            });
    }, []);

    if (error) return <div>{error}</div>;

    return (
        <div>
        <UserInfo user={user}/>
        <LogOut/>
        </div>
    );
}