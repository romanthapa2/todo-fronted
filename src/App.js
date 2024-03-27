import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./notes/context/notestate";
import Alerts from "./components/Alerts";
import Signup from "./components/Signup";
import Loginhoi from "./components/Loginhoi";
import { useState } from "react";

function App() {
  // this function set the new alert taking two props i.e message and type
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        {/* passing alert message and type from the above function as props to Alerts 
        components*/}
        <Alerts alert={alert}/>
        <div className="container">
        <Routes>
          {/* showalert function is passed to the other components
          as a props */}
          <Route exact path="/" element={<Home showAlert={showAlert}/>} />
          <Route exact path="/loginhoi" element={<Loginhoi showAlert={showAlert}/>} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
        </Routes>
        </div>
      </Router>
      </NoteState >
    </>
  );
}

export default App;
