import React, { useState, useEffect } from 'react';
import { Header, Footer, Note, CreateArea } from '../components';
import '../assets/index.css';
import axios from 'axios';

const URL = 'http://localhost:8000';

// todo
/*
1. replace loading... with a more UI icon
*/

function App() {
	const [noteArr, setNoteArr] = useState([]);
	const [loading, setLoading] = useState(true);

	function addNote(note) {
		setNoteArr((prevVal) => {
			return [...prevVal, note];
		});
	}

	const deleteNote = async (id) => {
		// eslint-disable-next-line
		const response = await fetch(`${URL}/api/v1/note/${id}`, {
			method: 'DELETE',
			mode: 'cors'
		})
			.then((response) => console.log(response))
			.catch((error) => console.log(error.response.data));

		const result = noteArr.filter((item) => item._id !== id);

		setNoteArr(result);
	};

	const fetchData = async () => {
		try {
			const response = await axios(`${URL}/api/v1/notes`);
			setNoteArr(response.data);
			setLoading(false);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="app">
			<Header />
			<CreateArea onAdd={addNote} />
			{loading ? (
				'Loading...'
			) : (
				<div className="note-ctn">
					{noteArr.map((item, index) => (
						<Note
							key={index}
							id={item._id}
							title={item.title}
							content={item.content}
							delete={deleteNote}
						/>
					))}
				</div>
			)}

			<Footer />
		</div>
	);
}

export default App;
