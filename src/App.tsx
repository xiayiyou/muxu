import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ThemeApplier from "@/theme/ThemeApplier";
import FloatingPhone from "@/components/FloatingPhone";
import FloatingMusic from "@/components/FloatingMusic";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/app";

const basename = import.meta.env.BASE_URL;

export default function App() {
  const [notificationGranted, setNotificationGranted] = useState(false);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationGranted(permission === "granted");
      });
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && notificationGranted) {
        document.title = "💬 苜蓿 · 有新消息";
      } else {
        document.title = "苜蓿";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [notificationGranted]);

  return (
    <>
      <ThemeApplier />
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <FloatingPhone />
      <FloatingMusic />
    </>
  );
}
