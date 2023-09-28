/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from "uuid";
import "../cv.css";
import { monthsList } from "../data/monthsArray";

export default function CVPreview({
  generalData,
  eduData,
  expData,
  skillsData,
}) {
  const monthConversion = (month, list, year) => {
    return month === "Month" && year !== "Present"
      ? "Enter Month"
      : year === "Present"
      ? ""
      : list.find((obj) => obj.month === month).numerical;
  };

  const yearConversion = (year) => {
    return year === "Year"
      ? "/Enter Year"
      : year === "Present"
      ? year
      : "/" + year;
  };

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
        {eduData.length < 1 ? (
          ""
        ) : (
          <>
            <h2>Education</h2> <div className="seperator" />
          </>
        )}
        {eduData.map((section) => (
          <div key={section.id} className="edu-section">
            <div className="cv-school">{section.school}</div>
            <div className="cv-date">
              {monthConversion(
                section.beginDate.month,
                monthsList,
                section.beginDate.year
              ) + yearConversion(section.beginDate.year)}
              {" - "}
              {monthConversion(
                section.endDate.month,
                monthsList,
                section.endDate.year
              ) + yearConversion(section.endDate.year)}
            </div>
            <div className="cv-degree">{section.degree}</div>
            <div className="cv-location">{section.location}</div>
          </div>
        ))}
      </div>
      <div className="cv-experience">
        {expData.length < 1 ? (
          ""
        ) : (
          <>
            <h2>Experience</h2>
            <div className="seperator" />
          </>
        )}
        {expData.map((section) => (
          <div key={section.id} className="exp-section">
            <div className="cv-position">{section.position}</div>
            <div className="cv-date">
              {monthConversion(
                section.beginDate.month,
                monthsList,
                section.beginDate.year
              ) + yearConversion(section.beginDate.year)}
              {" - "}
              {monthConversion(
                section.endDate.month,
                monthsList,
                section.endDate.year
              ) + yearConversion(section.endDate.year)}
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
        {skillsData.length < 1 ||
        (skillsData[0] === "" && skillsData.length < 2) ? (
          ""
        ) : (
          <>
            <h2>Skills</h2>
            <div className="seperator" />
          </>
        )}
        <div className="skills-section">
          {skillsData.map((skill) =>
            skill !== skillsData[skillsData.length - 1] ? (
              <span key={uuidv4()}>{skill}, </span>
            ) : (
              <span key={uuidv4()}>{skill}</span>
            )
          )}
        </div>
      </div>
    </>
  );
}
