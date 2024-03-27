import React,{useContext} from "react";
import notecontext from "../notes/context/createnotecontext";

// displaying the noteitems 
const Noteitem = (props) => {
  const context = useContext(notecontext);
  const { deletenote } = context;
  // taking props from the notes.js
  const { note,updateNote } = props;
  return (
    <div className=" col-md-4 my-2 m">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <i className="fa-solid fa-trash-can-arrow-up mx-4" 
          onClick={()=>{deletenote(note._id);props.showAlert("deleted successfully","success")} }></i>
          <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
          </div>
          <p className="card-text">
            {note.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
