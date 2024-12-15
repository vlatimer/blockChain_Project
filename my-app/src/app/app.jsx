import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Auth } from "./components/auth/auth";
import { Reg } from "./components/reg/reg";
import { Home } from "./components/home/home";
import { useCallback, useEffect, useState } from "react";

const MYAUTHDB = 'blockchainAuth'

export function App() {
  const [auth, setAuth] = useState({
    username: '',
    publicKey: '',
    isAuthorized: false,
  })

  const saveAuth = useCallback((username, publicKey, isAuthorized) => {
    if(!username || !publicKey || !isAuthorized){
      return false;
    }

    setAuth({
      username: username,
      publicKey: publicKey,
      isAuthorized: isAuthorized,
    });

    sessionStorage.setItem(MYAUTHDB, JSON.stringify({
      username: username,
      publicKey: publicKey,
      isAuthorized: isAuthorized,
    }))

    return true;
  }, [setAuth])

  useEffect(() => {
    if(!sessionStorage.getItem(MYAUTHDB)) {
      localStorage.setItem(MYAUTHDB, JSON.stringify({}))
    } else {
      const data = JSON.parse(sessionStorage.getItem(MYAUTHDB))
      saveAuth(data.username, data.publicKey, data.isAuthorized)
    }
  }, [saveAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth setAuth={saveAuth} auth={auth}/>}/>
        <Route path="/reg" element={<Reg setAuth={saveAuth}/>}/>
        <Route path="/home" element={<Home auth={auth}/>} />
        <Route path="*" element={<Navigate to="/auth" replace/>} />
      </Routes>
    </BrowserRouter>
  );
}