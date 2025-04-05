"use client";

import {
  setAuthToken as setTokenInStorage,
  deleteAuthToken as removeTokenFromStorage,
  getAuthToken as getTokenFromStorage,
} from "@/utils/authTokenManager";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface GlobalContextType {
  token: string | null;
  setAuthToken: (token: string) => void;
  deleteAuthToken: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getTokenFromStorage();
    setToken(storedToken);
  }, []);

  const handleSetAuthToken = (newToken: string) => {
    setTokenInStorage(newToken);
    setToken(newToken);
  };

  const handleDeleteAuthToken = () => {
    removeTokenFromStorage();
    setToken(null);
  };

  return (
    <GlobalContext.Provider
      value={{
        token,
        setAuthToken: handleSetAuthToken,
        deleteAuthToken: handleDeleteAuthToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
}
