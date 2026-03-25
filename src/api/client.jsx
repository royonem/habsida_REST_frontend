export const apiFetch = async (path, { method = "GET", body, headers = {}, skipAuth = false } = {}) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
        method,
        headers: {
            ...(token && !skipAuth ? { "Authorization": `Bearer ${token}` } : {}),
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
    const text = await res.text();
    return text ? JSON.parse(text) : null;
};

export function validatePassword(password, confirmPassword) {
    if (!password && !confirmPassword) return true;
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }
    return true;
}