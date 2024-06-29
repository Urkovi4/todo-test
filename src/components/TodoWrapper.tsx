import React, {
    useState,
    useEffect,
    useContext,
    useReducer,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material';
import { OnChangeValue } from 'react-select';
import {
    AppState,
    TodoInterface,
    DispatchContextType,
    SelectedInputInterface,
} from '../types';
import Counter from './Counter';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import EditItem from './EditItem';
import Snackbar from './Snackbar';
import DispatchContext from '../context/DispatchContext';
import Filters, { FilterStateInterface } from './Filters';

const initialTodos = [
    {
        id: '1',
        task: 'Learn Python',
        status: false,
        isEditing: false,
    },
    {
        id: '2',
        task: 'Rent flat',
        status: true,
        isEditing: false,
    },
];

enum FilterActionType {
    ADD = 'ADD',
    DELETE = 'DELETE',
}

const initFilters = () => ({
    filters: [],
});

interface ActionWithPayloadInterface {
    type: string;
    item: SelectedInputInterface;
}

interface ActionInterface {
    type: string;
}

type ActionTypeInterface = ActionWithPayloadInterface | ActionInterface;

const reducer = (state: FilterStateInterface, action: ActionTypeInterface): FilterStateInterface => {
    switch (action.type) {
        case FilterActionType.ADD:
            return { filters: [(action as ActionWithPayloadInterface).item] };
        case FilterActionType.DELETE:
            return initFilters();
        default:
            return state;
    }
};

const TodoWrapper: React.FC = () => {
    const [filtered, setFiltered] = useState<TodoInterface[]>([]);
    const [todos, setTodos] = useState<TodoInterface[]>(initialTodos);

    const [state, dispatchReducer] = useReducer(reducer, '', initFilters);

    const addSelectedFilter = (val: SelectedInputInterface) => {
        dispatchReducer({ type: FilterActionType.ADD, item: val });
    };

    const removeSelectedFilter = () => {
        dispatchReducer({ type: FilterActionType.DELETE });
    };
    
	const dispatch = useContext<DispatchContextType>(DispatchContext);

    const addTodo = (todo: string) => {
        const newTodos = [
            ...todos,
            {id: uuidv4(), task: todo, status: false, isEditing: false},
        ];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const toggleComplete = (id: string) => {
        const newTodos = todos.map(
            todo => todo.id === id ? {...todo, status: !todo.status} : todo
        );
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const deleteTodo = (id: string) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const editTodo = (id: string) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const editTask = (task: string, id: string) => {
        const newTodos = todos
            .map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

	const handleSnackbarColor = (msg: string, type: AppState['snackbar']['type']) => {
		dispatch({
			payload: { message: msg, type: type },
			type: 'OPEN_SNACKBAR',
		});
	};

    const handleStateChange = (option: OnChangeValue<SelectedInputInterface, false>) => {
        if (option) {
            addSelectedFilter(option);
        } else {
            removeSelectedFilter();  
        }
    };

    useEffect(() => {
        const localTodos = localStorage.getItem('todos');
        const savedTodos = (localTodos && JSON.parse(localTodos)) || [];
        setTodos(savedTodos);
    }, []);

    useEffect(() => {
        const selectedFilter = state.filters.length && state.filters[0];
        if (!selectedFilter || selectedFilter.value === 'all') {
            setFiltered(todos);
        } else if (selectedFilter.value === 'done') {
            setFiltered(todos.filter(item => item.status));
        } else if (selectedFilter.value === 'todo') {
            setFiltered(todos.filter(item => !item.status));
        } else {
            setFiltered([]);
        }
    }, [state, todos]);

    return (
        <Box className='todo-wrapper' gap={2}>
            <Box>
                <Snackbar />
            </Box>
            <Box>
                <h2>Todo Zupko</h2>
            </Box>
            <Box p={2}>
                <Counter todos={todos} state={state} />
            </Box>
            <Filters
                state={state}
                handleStateChange={handleStateChange}
            />
            <Box>
                <TodoForm
                    addTodo={addTodo}
                    handleSnackbarColor={handleSnackbarColor}
                />
            </Box>
            <Box>
                {filtered.map((todo, index) => (
                    todo.isEditing ? (
                        <EditItem
                            key={index}
                            task={todo}
                            editTodo={editTask}
                        />
                    ) : (
                        <TodoItem
                            task={todo}
                            key={index}
                            editTodo={editTodo}
                            deleteTodo={deleteTodo}
                            toggleComplete={toggleComplete}
                        />
                    )
                ))}
            </Box>
        </Box>
    );
};

export default TodoWrapper;