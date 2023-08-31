import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HeaderComponent from "./components/form-header.jsx";
import EducationComponent from "./components/form-education.jsx";
import ExperienceComponent from "./components/form-experience";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="form-container">
      <HeaderComponent />
      <EducationComponent />
      <ExperienceComponent />
    </div>
    <div className="cv-container">
      <div id="cv-previewer"></div>
    </div>
  </React.StrictMode>
);
