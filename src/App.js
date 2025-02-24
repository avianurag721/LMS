import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { useStateContext } from "./contexts/ContextProvider";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ThemeSettings from "./components/ThemeSettings";
import Footer from "./components/Footer";
import Login from "./components/Login"; // Import Login Component
import { Toaster } from "react-hot-toast";
import PatientRegisteration from "./pages/PatientRegisteration";
import { VisitCreation } from "./pages";

const App = () => {
  const { currentColor, setCurrentColor, currentMode, setCurrentMode, activeMenu, themeSettings, setThemeSettings } = useStateContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    const userLoggedIn = localStorage.getItem("isLoggedIn"); // Check login status

    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }

    setIsLoggedIn(userLoggedIn === "true"); // Convert string to boolean
  }, [isLoggedIn]);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        {!isLoggedIn ? (
          <Routes>
            <Route path="/*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        ) : (
          <div className="flex relative dark:bg-gray-900">
            <div className="fixed right-4 bottom-4 z-50">
              <button
                onClick={() => setThemeSettings(true)}
                style={{ backgroundColor: currentColor }}
                className="p-3 text-white rounded-full shadow-lg"
              >
                <FiSettings size={24} />
              </button>
            </div>

            {activeMenu ? (
              <div className="w-72 fixed bg-white dark:bg-gray-800 z-10">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0">
                <Sidebar />
              </div>
            )}

            <div className={activeMenu ? "bg-gray-100 dark:bg-gray-900 min-h-screen md:ml-72 w-full" : "w-full min-h-screen"}>
              <Navbar />
              <div>{themeSettings && <ThemeSettings />}</div>

              <Routes>
                <Route path="/" element={<PatientRegisteration />} />
                <Route path="/PatientRegisteration" element={<PatientRegisteration />} />
                <Route path="/visit-creation" element={<VisitCreation />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              <Footer />
            </div>
          </div>
        )}
      </BrowserRouter>
      <Toaster />
    </div>
  );
};

export default App;
