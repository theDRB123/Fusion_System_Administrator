import React, {createContext, useState, useContext} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(null); 
    
    const login = (token) => {
        setIsAuthenticated(true);
        setAuthToken(token);
        localStorage.setItem("authToken", token); 
      };

      const logout = () => {
        setIsAuthenticated(false);
        setAuthToken(null);
        localStorage.removeItem("authToken"); 
      };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authToken, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () =>useContext(AuthContext);