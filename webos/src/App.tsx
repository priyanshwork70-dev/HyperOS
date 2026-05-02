import { useEffect, useState } from "react";
import BootScreen from "./components/BootScreen";
import LoginScreen from "./components/LoginScreen";
import Desktop from "./components/Desktop";

export default function App() {
  const [stage, setStage] = useState("boot");
  const [user, setUser] = useState("Guest");

  useEffect(() => {
    const timer = setTimeout(() => setStage("login"), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (stage === "boot") return <BootScreen />;

  if (stage === "login") {
    return (
      <LoginScreen
        onLogin={(name) => {
          setUser(name || "Guest");
          setStage("desktop");
        }}
      />
    );
  }

  return <Desktop user={user} />;
}