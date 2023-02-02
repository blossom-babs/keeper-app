import React, { useState, useEffect } from 'react';
import { Header, Footer, Note, CreateArea } from '../components';
import '../assets/index.css';
import '../assets/index.scss';
import axios from 'axios';

const baseURL = 'http://localhost:8000/api/v1/notes';
const URL = 'http://localhost:8000/api/v1/note';

const App = () => {
	const [noteArr, setNoteArr] = useState([]);
	const [loading, setLoading] = useState(true);

	const addNote = (note) => {
		setNoteArr((prevVal) => {
			return [...prevVal, note];
		});
	};

	const deleteNote = async (id) => {
		await axios
			.delete(`${URL}/${id}`)
			.then((response) => console.log(response))
			.catch((error) => console.log(error));

		const result = noteArr.filter((item) => item._id !== id);

		setNoteArr(result);
	};

	const getData = async () => {
		try {
			const response = await axios(baseURL);
			setNoteArr(response.data);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getData();
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
};

export default App;
