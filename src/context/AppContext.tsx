import { createContext } from 'react';
import { AppState } from '../types';

const AppContext = createContext<AppState>({} as AppState);

export default AppContext;