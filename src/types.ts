export interface TodoInterface {
    id: string;
    task: string;
    status: boolean;
    isEditing: boolean;
}

export interface AppState {
	snackbar: {
		open: boolean;
		message: string;
		type: 'error' | 'success';
	};
}

export interface SelectedInputInterface {
    value: string;
    label: string;
}

export type SnackbarActionTypes = 'OPEN_SNACKBAR' | 'CLOSE_SNACKBAR';

export interface SnackbarAction {
	type: SnackbarActionTypes;
	payload?: Partial<AppState['snackbar']>;
}

export type AppActions = SnackbarAction;

export type DispatchContextType = React.Dispatch<AppActions>;