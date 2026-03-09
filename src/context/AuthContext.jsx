"use client";

import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [authData, setAuthData] = useState(null);

    return (
        <AuthContext.Provider value={{ authData, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
}