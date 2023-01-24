import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import '../assets/index.css';
import { useEffect } from 'react';

const URL = 'http://localhost:8000';

function App() {
	const [noteArr, setNoteArr] = useState([]);

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
		const response = await fetch(`${URL}/api/v1/notes`, {
			method: 'GET',
			mode: 'cors'
		});
		const data = await response.json();
		return setNoteArr(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<Header />
			<CreateArea onAdd={addNote} />
			{noteArr.map((item, index) => (
				<Note
					key={index}
					id={item._id}
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
