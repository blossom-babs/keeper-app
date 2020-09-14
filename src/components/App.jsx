import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import '../assets/index.css';

function App() {
  const [noteArr, setNoteArr] = useState([]);

  function addNote(note) {
    setNoteArr((prevVal) => {
      return [...prevVal, note];
    });
  }

  function deleteNote(id) {
    console.log(id)
    setNoteArr((prevVal) => {
      return prevVal.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {noteArr.map((item, index) => (
        <Note
          key={index}
          id={index}
          title={item.title}
          content={item.content}
          delete={deleteNote}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
