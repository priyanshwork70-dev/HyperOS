import { useEffect, useState } from "react";
import BootScreen from "./components/BootScreen";
import LoginScreen from "./components/LoginScreen";
import Desktop from "./components/Desktop";

const BOOT_TIME = 1800;
const USER_KEY = "hyperos:lastUser";

export default function App() {
  const [screen, setScreen] = useState("boot");
  const [activeUser, setActiveUser] = useState(() => {
    return localStorage.getItem(USER_KEY) || "Guest";
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen("login");
    }, BOOT_TIME);

    return () => clearTimeout(timer);
  }, []);

  const loginUser = (typedName) => {
    const cleanName = typedName.trim();

    if (cleanName.length < 2) {
      alert("Enter at least 2 characters.");
      return;
    }

    localStorage.setItem(USER_KEY, cleanName);
    setActiveUser(cleanName);
    setScreen("desktop");
  };

  const guestLogin = () => {
    localStorage.setItem(USER_KEY, "Guest");
    setActiveUser("Guest");
    setScreen("desktop");
  };

  const logoutUser = () => {
    setScreen("login");
  };

  if (screen === "boot") return <BootScreen />;

  if (screen === "login") {
    return (
      <LoginScreen
        previousUser={activeUser}
        onLogin={loginUser}
        onGuestLogin={guestLogin}
      />
    );
  }

  return <Desktop userName={activeUser} onLogout={logoutUser} />;
}
