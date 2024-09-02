import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("login_status") || ""
  );
  const changeStateLogin = (state) => {
    setIsLoggedIn(state);
    sessionStorage.setItem("login_status", state);
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, changeStateLogin }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};
