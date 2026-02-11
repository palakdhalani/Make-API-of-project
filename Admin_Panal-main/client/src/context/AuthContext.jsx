import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("AuthContext: Performing checkAuth...");
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await api.get('/auth/check');
            console.log("AuthContext: User authenticated", res.data);
            setUser({ isAdmin: true });
        } catch (err) {
            console.log("AuthContext: No active session or error", err.message);
            setUser(null);
        } finally {
            setLoading(false);
            console.log("AuthContext: Loading finished");
        }
    };

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data.success) {
                setUser({ isAdmin: true });
                return true;
            }
            return false;
        } catch (err) {
            console.error("Login Error:", err.response?.data || err.message);
            throw err;
        }
    };

    const signup = async (email, password) => {
        try {
            const res = await api.post('/auth/signup', { email, password });
            return res.data.success;
        } catch (err) {
            console.error("Signup Error:", err.response?.data || err.message);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null);
        } catch (err) {
            console.error("Logout Error:", err);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
