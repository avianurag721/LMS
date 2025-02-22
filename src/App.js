import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { useStateContext } from "./contexts/ContextProvider";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ThemeSettings from "./components/ThemeSettings";
import Footer from "./components/Footer";
import Customers from "./pages/Customers";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { currentColor, setCurrentColor, currentMode, setCurrentMode, activeMenu, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
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
              <Route path="/" element={<Customers />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
      <Toaster />
    </div>
  );
};

export default App;
