import React, { createContext, useContext, useState } from 'react';

// Define the roles
export const roles = {
    CLIENT: 'client',
    INTERN: 'intern',
    ADMIN: 'admin',
    HR: 'hr',
    ACCOUNT_SALES: 'account_sales',
    SUPER_ADMIN: 'super_admin',
};

// Create the Authentication Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    const login = (role) => {
        if (Object.values(roles).includes(role)) {
            setUserRole(role);
        }
    };

    const logout = () => {
        setUserRole(null);
    };

    const isAuthenticated = () => userRole !== null;

    return (
        <AuthContext.Provider value={{ userRole, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};