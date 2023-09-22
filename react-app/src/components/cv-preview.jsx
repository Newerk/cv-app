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
        <h1>{/* {generalData.name} */}</h1>
        <span>
          {/* <>{generalData.email}</> <>{generalData.phoneNum}</> */}
        </span>
      </div>
      <div className="cv-education">
        <h2>Education</h2>
        {/* {eduData} */}
      </div>
      <div className="cv-experience">
        <h2>Experience</h2>
        {/* {expData} */}
      </div>
      <div className="cv-skills">
        <h2>Skills</h2>
        {/* {skillsData} */}
      </div>
    </>
  );
}
