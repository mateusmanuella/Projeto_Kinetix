import React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, setAuthToken } from "../api/client.js";

const AuthContext = createContext(null);
const STORAGE_KEY = "kinetix.session";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    setAuthToken(session?.token);
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [session]);

  async function login(payload) {
    const { data } = await api.post("/api/auth/login", payload);
    setSession(data);
    return data;
  }

  async function register(payload) {
    const { data } = await api.post("/api/auth/register", payload);
    return data;
  }

  function logout() {
    setSession(null);
  }

  const value = useMemo(() => ({ session, login, register, logout }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
