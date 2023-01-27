import React, { useState, useRef } from 'react';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import axios from 'axios';

const baseURL = 'http://localhost:8000/api/v1/notes';

function CreateArea(props) {
	const textareaEl = useRef();
	const [note, setNote] = useState({
		title: '',
		content: ''
	});

	const addNote = (e) => {
		const { name, value } = e.target;
		setNote((prevVal) => {
			return {
				...prevVal,
				[name]: value
			};
		});
		autoResize(e);
	};

	function submitNote(e) {
		axios
			.post(baseURL, note)
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err.response.data);
			});

		props.onAdd(note);
		setNote({
			title: '',
			content: ''
		});
		reduceSize();
		e.preventDefault();
	}

	const autoResize = (e) => {
		const target = e.currentTarget;
		target.style.height = 'auto';
		target.style.height = target.scrollHeight + 'px';
	};

	const reduceSize = () => {
		const target = textareaEl.current;
		target.style.height = 'auto';
	};

	return (
		<div>
			<form className="create-note">
				<input
					value={note.title}
					onChange={addNote}
					name="title"
					placeholder="Title"
				/>
				<textarea
					placeholder="Take a note"
					name="content"
					value={note.content}
					ref={textareaEl}
					onChange={addNote}></textarea>
				<Zoom in={true}>
					<IconButton onClick={submitNote}>
						<AddIcon />
					</IconButton>
				</Zoom>
			</form>
		</div>
	);
}

export default CreateArea;
