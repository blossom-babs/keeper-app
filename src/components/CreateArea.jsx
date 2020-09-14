import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {
  const [state, setState] = useState(false)
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function addNote(e) {
    const { name, value } = e.target;
    setNote((prevVal) => {
      return {
        ...prevVal,
        [name]: value
      };
    });
  }

  function submitNote(e) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    })
    e.preventDefault();
  }

  function expandTabs() {
    setState(true)
  }

  return (
    <div>
      <form className="create-note">

        {state && <input
          value={note.title}
          onChange={addNote}
          name="title"
          placeholder="Title"
        />}
        <textarea
          onClick={expandTabs}
          value={note.content}
          onChange={addNote}
          name="content"
          placeholder="Take a note..."
          rows={state ? "3" : "1"}
        />
        <Zoom in={state ? true : false}>
          <IconButton onClick={submitNote}><AddIcon /></IconButton>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
