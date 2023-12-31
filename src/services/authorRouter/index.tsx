/* eslint-disable */
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import routerNames from "src/utils/data/routerName";
import { localRemoveAccount, localRemoveToken } from "src/utils/localStorage";
import { fakeAuthProvider } from "./auth";
import { AuthContextType } from "./interfaces";

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [account, setAccount] = useState<any>(null);
  let [token, setToken] = useState<any>(null);

  let signIn = (
    newToken: string,
    newAccount: string,
    callback: VoidFunction
  ) => {
    return fakeAuthProvider.signIn(() => {
      setToken(newToken);
      setAccount(newAccount);
      callback();
    });
  };

  let signOut = (callback: VoidFunction) => {
    return fakeAuthProvider.signOut(() => {
      setToken(null);
      setAccount(null);
      localRemoveAccount();
      localRemoveToken();
      callback();
    });
  };

  let value = { token, account, signIn, signOut };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  let history = useHistory();

  // if (!auth.token) {
  //   history.push({
  //     pathname: routerNames.SIGN_IN,
  //   });
  // }

  return children;
}
