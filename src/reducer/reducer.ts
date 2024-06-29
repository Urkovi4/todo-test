import { AppActions, AppState } from '../types';

const reducer = (state: AppState, action: AppActions) => {
	switch (action.type) {
		case 'OPEN_SNACKBAR': {
			state.snackbar = {
				...state.snackbar,
				...action.payload,
				open: true,
			};
			return { ...state };
		}
		case 'CLOSE_SNACKBAR': {
			state.snackbar.open = false;
			return { ...state };
		}
		default: {
			return { ...state };
		}
	}
};

export default reducer;