import React from "react";
import { Link,useNavigate } from "react-router-dom";

// returns navbar
const Navbar = () => {
  // uselocation helps to find out the location of click
  let history=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    history('/loginhoi');
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" style={{marginLeft:"5%"}} to="/">
            notebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" style={{marginRight:"3%"}} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">

              </li>
            </ul>

            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
              {/* if user already login i.e if there is token then show logout other wise show login and singup */}
              {!localStorage.getItem('token')?
              <div className="d-flex">
              <Link className="btn btn-primary mx-2" to="/loginhoi" role="button">
                login
              </Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">
                signup
              </Link></div>
               :<button onClick={handleLogout} className="btn btn-primary mx-3">Logout</button>}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
