import React, { useReducer } from 'react';
import './App.scss';
import reducer from './reducer/reducer';
import AppContext from './context/AppContext';
import TodoWrapper from './components/TodoWrapper';
import DispatchContext from './context/DispatchContext';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
		snackbar: {
			message: '',
			type: 'error',
			open: false,
		},
	});
  return (
    <AppContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
            <div className='app'>
              <TodoWrapper />
            </div>
        </DispatchContext.Provider>
    </AppContext.Provider>
);
}

export default App;
