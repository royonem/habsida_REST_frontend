export const apiFetch = async (path, { method = "GET", body, headers = {} } = {}) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
        method,
        headers: {
            "Authorization": token ? `Bearer ${token}` : undefined,
            "Content-Type": "application/json",
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined
    });

    if (!res.ok) {
        const text = await res.text();
        console.error("Backend error:", text);
        throw new Error(`Request failed: ${res.status}`);
    }
    return res.json();
};

export function validatePasswords(password, confirmPassword) {
    if (!password && !confirmPassword) return true;
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }
    return true;
}