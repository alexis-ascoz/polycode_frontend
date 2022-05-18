import { createContext, useEffect, useState } from "react";

export interface IUserContext {
  isLoggedIn: boolean;
  setUser: (user: IUserContext) => void;
}

export const UserContext = createContext<any>(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    isLoggedIn: false,
  });

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setUser({
        isLoggedIn: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valueContext = { user, setUser }

  return (
    <UserContext.Provider value={valueContext}>
      {children}
    </UserContext.Provider>
  );
}
