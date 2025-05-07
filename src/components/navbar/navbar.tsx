import { useEffect, useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const getThemeMode = () => {
  return localStorage.getItem("theme") === "dark-mode";
};

export const Navbar = () => {
  const [nightMode, setNightMode] = useState(getThemeMode());
  const navigate = useNavigate();

  useEffect(() => {
    const storedMode = getThemeMode();
    setNightMode(storedMode);
    document.documentElement.setAttribute(
      "data-theme",
      storedMode ? "dark-mode" : "light-mode"
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", nightMode ? "dark-mode" : "light-mode");
    const modeText = nightMode ? "dark-mode" : "light-mode";
    document.documentElement.setAttribute("data-theme", modeText);
  }, [nightMode]);

  const switchMode = () => {
    setNightMode(!nightMode);
  };

  return (
    <div className="container">
      <h1 className="heading" onClick={() => navigate("/")}>
        Where in the world?
      </h1>
      <div
        className={`icon ${nightMode ? "light" : "dark"}`}
        onClick={() => switchMode()}
      ></div>
      <p className="para" onClick={() => switchMode()}>
        {nightMode ? "Light Mode" : "Dark Mode"}
      </p>
    </div>
  );
};
