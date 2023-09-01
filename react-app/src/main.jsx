import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HeaderComponent from "./components/form-header.jsx";
import EducationComponent from "./components/form-education.jsx";
import ExperienceComponent from "./components/form-experience";
import CVPreview from "./components/cv-preview";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="content">
      <div className="form-container">
        <HeaderComponent />
        <EducationComponent />
        <ExperienceComponent />
      </div>
      <div className="cv-container">
        <div id="cv-previewer">
          TEXT
          <CVPreview />
        </div>
      </div>
    </div>
  </React.StrictMode>
);
