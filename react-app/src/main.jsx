import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import HeaderComponent from "./components/form-header.jsx";
// import EducationComponent from "./components/form-education.jsx";
// import ExperienceComponent from "./components/form-experience";
// import CVPreview from "./components/cv-preview";
// import SkillsComponent from "./components/form-skills";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <div className="content">
      <div className="form-container">
        <HeaderComponent />
        <EducationComponent />
        <ExperienceComponent />
        <SkillsComponent />
      </div>
      <div className="cv-container">
        <div id="cv-previewer">
          <CVPreview 
          generalData={}
          eduData={}
          expData={}
          skillsData={}/>
        </div>
      </div>
    </div> */}
  </React.StrictMode>
);
