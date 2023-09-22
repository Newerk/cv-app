/* eslint-disable react/prop-types */
import "../cv.css";

export default function CVPreview({
  generalData,
  eduData,
  // expData,
  // skillsData,
}) {
  return (
    <>
      <div className="cv-general">
        <h1 className="cv-name">{generalData.name}</h1>
        <div>
          <div className="cv-email">{generalData.email}</div>
          <div className="cv-number">{generalData.phoneNum}</div>
        </div>
      </div>
      <div className="cv-education">
        <h2>Education</h2>
        <div className="seperator"></div>
        {eduData.map((section) => (
          <div key={section.id} className="edu-section">
            <div className="cv-school">{section.school}</div>
            <div className="cv-date">
              {section.beginDate.month + " " + section.beginDate.year}-
              {section.endDate.month + " " + section.endDate.year}
            </div>
            <div className="cv-degree">{section.degree}</div>
            <div className="cv-location">{section.location}</div>
          </div>
        ))}
      </div>
      <div className="cv-experience">
        <h2>Experience</h2>
        <div className="seperator"></div>

        {/* {expData} */}
      </div>
      <div className="cv-skills">
        <h2>Skills</h2>
        <div className="seperator"></div>

        {/* {skillsData} */}
      </div>
    </>
  );
}
