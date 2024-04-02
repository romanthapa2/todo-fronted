import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Loginhoi = (props) => {
  // usenaviagate to redirect to another component
  let history = useNavigate();
  // setting the inital value as blank
  const [value, setvalue] = useState({ email: "", password: "" });
  // when the submit button is clicked this function excutes and sends data to
  // the body of backend and returns the same response
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://todo-backend-ebon.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: value.email, password: value.password }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.token);
      // sending the props to the showAlert function of the file App.js
      props.showAlert("logged in successfully", "success");
      history("/");
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
      <form className="container w-50" onSubmit={handleSubmit}>
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
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Loginhoi;
