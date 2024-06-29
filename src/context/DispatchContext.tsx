import { createContext } from 'react';
import { DispatchContextType } from '../types';

const DispatchContext = createContext<DispatchContextType>(
	{} as DispatchContextType
);

export default DispatchContext;