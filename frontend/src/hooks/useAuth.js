const useAuth = () => {
    let user = null;
    let token = null;
    
    try {
        if (typeof window !== "undefined") {
            user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
            token = localStorage.getItem("token");
        }
    } catch (e) {
        console.error("Error reading from localStorage:", e);
    }

    const isAuthenticated = !!user && !!token;
    
    return { user, token, isAuthenticated };
}

export default useAuth;
