import React, { useContext, useEffect, useRef, useState } from "react";
import notecontext from "../notes/context/createnotecontext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate} from "react-router-dom";

// ilitrates the notes using map to Noteitem component
const Notes = (props) => {
  // taking out the notes from the import notecontext from
  // "../notes/context/createnotecontext"
  let history=useNavigate();
  const context = useContext(notecontext);
  const { notes, getNotes,editnote} = context;
  // the useeffect helps to stop looping the function and re-executes when value 
  // changes in [] but when there is no value it only runs once
  // if user already login or signup and there is user token in localstorage then get access to getnoes 
  // otherwise redirect to /login page
  useEffect(() => {
    if (localStorage.getItem('token')){
      getNotes();
    }
    else{
      history('/loginhoi')
    }
   // eslint-disable-next-line
  },[]);

  // use ref :it is  like document.queryselector
  const ref = useRef(null);
  const [note, setNote] = useState({id:"",etitle: "", edesc: "" });

  // it get the updated note as currentNote and ref helps to find which note is clicked
  // and update using setnote
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edesc: currentNote.desc });
  };

  // sending the updated note to the editnote function in notestate.js file
  const closeref = useRef(null);
  const handleClick = (e) => {
    editnote(note.id,note.etitle,note.edesc)
    closeref.current.click();
    props.showAlert("updated note successfully","success")
  };

  // this function helps to write in the form
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={props.showAlert}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edesc"
                    name="edesc"
                    value={note.edesc}
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container row my-2 w-75 " style={{marginLeft:'11%'}}>
        <h5>Your notes</h5>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
        })}
      </div>
    </>
  );
};

export default Notes;
