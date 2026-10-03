"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Address, User } from "@/types";

interface AuthContextValue {
  user: User | null;
  isReady: boolean;
  signIn: (email: string, name: string) => User;
  signOut: () => void;
  updateAddress: (address: Address) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "marketlane-session-v1";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setUser(JSON.parse(saved) as User);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [isReady, user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      signIn(email, name) {
        const session: User = {
          id: `usr-${crypto.randomUUID()}`,
          role: { id: "customer", name: "Customer" },
          active: true,
          createdAt: new Date().toISOString(),
          profile: { name, email },
          addresses: [],
        };
        setUser(session);
        return session;
      },
      signOut() {
        setUser(null);
      },
      updateAddress(address) {
        setUser((current) =>
          current
            ? {
                ...current,
                addresses: [
                  address,
                  ...(current.addresses ?? []).filter(
                    (item) => item.id !== address.id,
                  ),
                ],
              }
            : current,
        );
      },
    }),
    [isReady, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
