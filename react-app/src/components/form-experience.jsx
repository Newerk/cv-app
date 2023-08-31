import DateRange from "./date-range";

function Company() {
  return (
    <>
      Employer
      <label htmlFor="company">
        <input type="text" name="company" id="company" />
      </label>
    </>
  );
}

function JobTitle() {
  return (
    <>
      Job Title
      <label htmlFor="position">
        <input type="text" name="job title" id="position" />
      </label>
    </>
  );
}

function BulletPoints() {
  return <></>;
}

export default function ExperienceComponent() {
  return (
    <>
      <h1>Experience</h1>
      <div>
        <JobTitle />
        <Company />
        <DateRange />
      </div>
      <div className="bullets-wrapper"></div>
    </>
  );
}
