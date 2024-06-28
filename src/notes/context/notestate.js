import { baseUrl } from "../../Url";
import notecontext from "./createnotecontext";
import React, { useState } from "react";

const NoteState = (props) => {
  const notesinital = [];
  const [notes, setnotes] = useState(notesinital);

    // get all notes from the backend and setnotes
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${baseUrl}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json=await response.json();
      console.log(json)
      setnotes(json)
    };

  // add a note
  const addnote = async (title, desc) => {
    // API Call to add the title and desc from fronted to backend
    const response = await fetch(`${baseUrl}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, desc})
    });
    // response.json provides the added note
    const note= await response.json();
    setnotes(notes.concat(note));
  };

  // delete a note 
  const deletenote = async(id) => {
        // TODO: API Call
        const response = await fetch(`${baseUrl}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json= await response.json();
        console.log(json)

    // when note id and clicking id is not same then add it to setnotes 
    // otherwise dont add
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)
  };

  // edit a note
  const editnote = async(id,title,desc) => {
      // API Call 
      // updated title and desc is sent to the backend form backend
      const response = await fetch(`${baseUrl}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, desc})
      });
      let json = await response.json();
      console.log(json)
  
      // creates a deep copy of notes
      const chgtoparse=JSON.parse(JSON.stringify(notes))
      // Logic to edit in client if element id and clicking note id match update the values
      for (let index = 0; index < chgtoparse.length; index++) {
        const element = chgtoparse[index];
        if (element._id === id) {
          chgtoparse[index].title = title;
          chgtoparse[index].desc = desc;
          break;
  }
}setnotes(chgtoparse)};

  // adding in the value so that tha values can be accessed anywhere
  return (
    <notecontext.Provider
      value={{ notes, setnotes, addnote, deletenote, editnote,getNotes }}>
      {props.children}
    </notecontext.Provider>
  )
};

export default NoteState;
