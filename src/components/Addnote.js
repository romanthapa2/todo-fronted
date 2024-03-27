import React, { useContext, useState } from "react";
import notecontext from "../notes/context/createnotecontext";

// adding a note
const Addnote = (props) => {
  //taking out the addnote from the notecontext
  const context = useContext(notecontext);
  const { addnote } = context;
  const [note, setnote] = useState({ title: "", desc: "" });
  //when button is clicked the handleclick function runs
  // and inside it addnote function will run passing props from here
  // to addnote functon in notestate.js file
  const handleclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.desc);
    setnote({ title: "", desc: "" })
    props.showAlert("Added note succesfully","success");
  };

  // when input is typing this function will run. from the e.target it will take name
//of the input and value and add to the existing value in this case note
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnote((note) => ({ ...note, [name]: value }));
  };

//   this returns the form where we type title and desc
  return (
    <div className="container w-75">
      <h4>Add a new note</h4>
      <form onSubmit={handleclick}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={handleChange} minLength={5} required
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-2">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="desc"
            name="desc"
            value={note.desc}
            onChange={handleChange}
            minLength={5} required
          />
        </div>
        <button type="submit" className="btn btn-primary mb-1">
          Addnote
        </button>
      </form>
    </div>
  );
};

export default Addnote;
