import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import LabelIcon from '@mui/icons-material/Label';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	outline: 0
};

const Note = (props) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<ClickAwayListener>
			<div className="note">
				<button className="note-openModal" onClick={handleOpen}>
					{' '}
					Open note
				</button>
				<h1 className="note-heading">{props.title}</h1>
				<p className="note-content">{props.content}</p>
				<button
					className="note-delete"
					onClick={() => {
						props.delete(props.id);
					}}>
					<DeleteIcon />
				</button>
				<Modal
					onClickAway={handleClose}
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description">
					<Box sx={style}>
						<h1 className="note-heading" id="modal-modal-title">
							{props.title}
						</h1>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							{props.content}
						</Typography>
					</Box>
					<div>
						<LabelIcon/>
						<button
					className="note-delete"
					onClick={() => {
						props.delete(props.id);
					}}>
					<DeleteIcon />
				</button>
					</div>
				</Modal>
			</div>
		</ClickAwayListener>
	);
};

export default Note;
