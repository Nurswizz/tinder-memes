const useAuth = () => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const token = localStorage.getItem("token");
    
    const isAuthenticated = !!user && !!token;
    
    return { user, token, isAuthenticated };
}

export default useAuth;
