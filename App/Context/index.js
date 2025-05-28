import {createContext, useState} from 'react';

export const GlobalContext = createContext(null);

export default function GlobalState({children}) {
  const [showLoginView, setShowLoginView] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        showLoginView,
        setShowLoginView,
        currentUserName,
        setCurrentUserName,
        isRegistered,
        setIsRegistered,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
