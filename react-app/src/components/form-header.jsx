import { useState } from "react";

function FullName({handleChange }) {
  return (
    <label htmlFor="fullname">
      Full Name
      <input
        type="text"
        name="full name"
        id="fullname"
        placeholder={name}
        onChange={handleChange}
      />
    </label>
  );
}

function Email({ email, handleChange }) {
  return (
    <label htmlFor="email">
      Email
      <input type="email" name="e-mail" id="email" onChange={handleChange} />
    </label>
  );
}

function PhoneNumber({ phoneNum, handleChange }) {
  return (
    <label htmlFor="phone-num">
      Phone Number
      <input
        type="text"
        name="phone number"
        id="phone-num"
        onChange={handleChange}
      />
    </label>
  );
}

export default function HeaderComponent() {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    phoneNum: 0,
  });

  const handleNameChange = (e) =>
    setInputValues({ ...inputValues, name: e.target.value });

  const handleEmailChange = (e) =>
    setInputValues({ ...inputValues, email: e.target.value });

  const handleNumberChange = (e) =>
    setInputValues({ ...inputValues, phoneNum: e.target.value });

  return (
    <>
      <div className="header-component">
        <h1>General Information</h1>
        <FullName handleChange={handleNameChange} />
        <Email handleChange={handleEmailChange} />
        <PhoneNumber handleChange={handleNumberChange} />
      </div>
    </>
  );
}
