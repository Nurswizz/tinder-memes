const useAuth = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    
    const isAuthenticated = !!user && !!token;
    
    return { user, token, isAuthenticated };
}

export default useAuth;