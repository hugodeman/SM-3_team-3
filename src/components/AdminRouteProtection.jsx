import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function AdminRouteProtection({ children }) {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch(`http://145.24.223.169/api/v1/users?token=${token}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer 5|LVAIuyWxZqzKHNVw50jc2c6vCjk2NFBy4yxULA4m17c40042`,
                    },
                });

                if (!res.ok) throw new Error(`HTTP-fout! status: ${res.status}`);

                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error("Fout bij ophalen data:", err);
            }
        }

        fetchUsers();
    }, [token]);
    if (user?.role === 'student') return <Navigate to="/" replace />;

    if(user?.role === 'admin') return children;
}

export default AdminRouteProtection;
