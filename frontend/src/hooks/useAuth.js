const useAuth = () => {
    let user = null;
    let token = null;

    try {
        if (typeof window !== "undefined") {
            const userRaw = localStorage.getItem("user");
            if (userRaw && userRaw !== "undefined") {
                user = JSON.parse(userRaw);
            }
            token = localStorage.getItem("token");
        }
    } catch (e) {
        console.error("Error reading from localStorage:", e);
        user = null;
        token = null;
    }

    const isAuthenticated = !!user && !!token;

    return { user, token, isAuthenticated };
};

export default useAuth;