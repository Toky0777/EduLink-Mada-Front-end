import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                const response = await authAPI.getUser();
                setUser(response.data);
            } catch (error) {
                localStorage.removeItem('auth_token');
            }
        }
        setLoading(false);
    };

    const login = async (credentials) => {
        const response = await authAPI.login(credentials);
        const { user, access_token } = response.data;

        localStorage.setItem('auth_token', access_token);
        setUser(user);

        return response.data;
    };

    const register = async (userData) => {
        const response = await authAPI.register(userData);
        const { user, access_token } = response.data;

        localStorage.setItem('auth_token', access_token);
        setUser(user);

        return response.data;
    };

    const logout = async () => {
        await authAPI.logout();
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};