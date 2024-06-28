import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../Url";

const Signup = (props) => {
  let history = useNavigate();
      // setting the inital value as blank
  const [value, setvalue] = useState({ name: "", email: "", password: "", cpassword: "" });
  // when the submit button is clicked this function excutes and sends data to
  // the body of backend and returns the same response
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = value;
    const response = await fetch(`${baseUrl}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.token);
      history("/");
      // sending the props to the showAlert function of the file App.js
      props.showAlert("account created successfully", "success");
    } else {
      props.showAlert("invalid user", "danger");
    }
  };
      // sets the value when user types in the input form
  const onChange = (e) => {
    setvalue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"> Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            name="cpassword"
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Confirm Password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Signup;
