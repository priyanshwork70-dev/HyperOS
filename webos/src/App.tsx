import { useEffect, useState } from "react";
import BootScreen from "./components/BootScreen";
import LoginScreen from "./components/LoginScreen";
import Desktop from "./components/Desktop";

const BOOT_DELAY = 1700;
const SAVED_USER_KEY = "hyperos:lastUser";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("boot");
  const [desktopUser, setDesktopUser] = useState(() => {
    return localStorage.getItem(SAVED_USER_KEY) || "Guest";
  });

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setCurrentScreen("login");
    }, BOOT_DELAY);

    return () => clearTimeout(bootTimer);
  }, []);

  const handleLogin = (nameFromInput) => {
    const cleanedName = nameFromInput.trim();

    if (cleanedName.length < 2) {
      alert("Please enter at least 2 characters.");
      return;
    }

    localStorage.setItem(SAVED_USER_KEY, cleanedName);
    setDesktopUser(cleanedName);
    setCurrentScreen("desktop");
  };

  const continueAsGuest = () => {
    localStorage.setItem(SAVED_USER_KEY, "Guest");
    setDesktopUser("Guest");
    setCurrentScreen("desktop");
  };

  const logoutUser = () => {
    setCurrentScreen("login");
  };

  if (currentScreen === "boot") {
    return <BootScreen />;
  }

  if (currentScreen === "login") {
    return (
      <LoginScreen
        previousUser={desktopUser}
        onLogin={handleLogin}
        onGuestLogin={continueAsGuest}
      />
    );
  }

  return <Desktop userName={desktopUser} onLogout={logoutUser} />;
}