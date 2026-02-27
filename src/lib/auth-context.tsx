"use client"; import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Seller } from "./mock-data";
import { sellers } from "./mock-data"; interface User { id: string; name: string; email: string; avatar: string; role: "buyer" | "seller" | "both"; seller?: Seller;
} interface AuthContextType { user: User | null; isAuthenticated: boolean; login: (email: string, password: string) => void; signup: (data: { name: string; email: string; password: string; role: "buyer" | "seller" | "both" }) => void; logout: () => void;
} const AuthContext = createContext<AuthContextType | undefined>(undefined); const mockUser: User = { id: "u1", name: "Marcus Chen", email: "marcus@pnwbuilders.com", avatar: sellers[0].avatar, role: "both", seller: sellers[0],
}; export function AuthProvider({ children }: { children: ReactNode }) { const [user, setUser] = useState<User | null>(mockUser); const login = useCallback((_email: string, _password: string) => { setUser(mockUser); }, []); const signup = useCallback( (_data: { name: string; email: string; password: string; role: "buyer" | "seller" | "both" }) => { setUser(mockUser); }, [] ); const logout = useCallback(() => { setUser(null); }, []); return ( <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, }} > {children} </AuthContext.Provider> );
} export function useAuth() { const context = useContext(AuthContext); if (!context) { throw new Error("useAuth must be used within an AuthProvider"); } return context;
}
