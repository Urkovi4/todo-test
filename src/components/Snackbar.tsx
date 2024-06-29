import React, { useContext } from 'react';
import { Box } from '@mui/material';
import AppContext from '../context/AppContext';
import DispatchContext from '../context/DispatchContext';
import { AppState, DispatchContextType } from '../types';

const CLOSE_SUCCESS_TIME = 7000;

const Snackbar: React.FC = () => {
	const { snackbar } = useContext<AppState>(AppContext);
	const dispatch = useContext<DispatchContextType>(DispatchContext);

	if (snackbar.open && snackbar.type === 'success') {
		setTimeout(() => {
			dispatch({ type: 'CLOSE_SNACKBAR' });
		}, CLOSE_SUCCESS_TIME);
	}

	return (
		<Box
			className='snackbar top-center'
			style={{
				minWidth: '420px',
				minHeight: '80px',
				display: snackbar.open ? 'flex' : 'none',
				backgroundColor: `var(--${snackbar.type}-bg)`,
			}}
		>
			<p>{snackbar.message}</p>
			<button onClick={() => dispatch({ type: 'CLOSE_SNACKBAR' })}>
				✖️
			</button>
		</Box>
	);
};

export default Snackbar;