import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import GameDashboard from "./components/GameDashboard";
// import PlayerStats from './components/PlayerStats';

import "./index.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return isLoggedIn ? (
    <GameDashboard />
  ) : (
    <LoginPage
      onLogin={handleLogin}
      isSignUp={isSignUp}
      setIsSignUp={setIsSignUp}
    />
    
  );
  
};

export default App;
