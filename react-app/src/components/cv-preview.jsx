/* eslint-disable react/prop-types */
import "../cv.css";

export default function CVPreview({
  generalData,
  eduData,
  expData,
  skillsData,
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
        <div className="seperator" />
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
        <div className="seperator" />
        {expData.map((section) => (
          <div key={section.id} className="exp-section">
            <div className="cv-position">{section.position}</div>
            <div className="cv-date">
              {section.beginDate.month + " " + section.beginDate.year}-
              {section.endDate.month + " " + section.endDate.year}
            </div>
            <div className="cv-employer">{section.employer}</div>
            <div className="cv-location">{section.location}</div>
            <ul className="cv-bulletpoints">
              {section.bulletPoints.map((point) => (
                <li key={point.id}>{point.info}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="cv-skills">
        <h2>Skills</h2>
        <div className="seperator" />
        <div className="skills-section">
          {skillsData.map((skill) =>
            skill !== skillsData[skillsData.length - 1] ? (
              <span key={skill}>{skill}, </span>
            ) : (
              <span key={skill}>{skill}</span>
            )
          )}
        </div>
      </div>
    </>
  );
}
