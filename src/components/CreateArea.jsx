import React, { useState, useRef } from 'react';
import axios from 'axios';
import { IconButton,Zoom } from '@mui/material';
import  AddIcon  from '@mui/icons-material/Add';
const baseURL = 'http://localhost:8000/api/v1/notes';

const CreateArea = (props) => {
	const textareaEl = useRef();
	const [state, setState] = useState(false);
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
		displayBtn(e);
	};

	const displayBtn = (e) => {
		const target = e.currentTarget;
		if (target.name === 'content') setState(true);
	};

	const submitNote = (e) => {
		axios
			.post(baseURL, note)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});

		props.onAdd(note);
		setNote({
			title: '',
			content: ''
		});
		reduceSize();
		e.preventDefault();
	};

	const autoResize = (e) => {
		const target = e.currentTarget;
		target.style.height = 'auto';
		target.style.height = target.scrollHeight + 'px';
	};

	const reduceSize = () => {
		setState(false);
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
					required
					placeholder="Take a note"
					name="content"
					value={note.content}
					ref={textareaEl}
					onChange={addNote}></textarea>

				<Zoom in={state ? true : false}>
					<IconButton onClick={submitNote}>
						<AddIcon />
					</IconButton>
				</Zoom>
			</form>
		</div>
	);
};

export default CreateArea;
