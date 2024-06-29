import React from 'react';
import { Box } from '@mui/material';
import { TodoInterface } from '../types';
import { FilterStateInterface } from './Filters';

interface Props {
    todos: TodoInterface[];
    state: FilterStateInterface;
}

const Counter: React.FC<Props> = ({ todos, state }: Props) => {
    const finished = todos.filter((item) => item.status);
    const todo = todos.filter((item) => !item.status);
    const filter = state.filters.length ? state.filters[0] : null;

    return (
        <Box
            style={{
                color: '#171722',
                display: 'flex',
                fontSize: '1.25rem',
                flexDirection: 'row',
                justifyContent: 'space-around',
            }}
        >
            {filter?.value === 'done' || filter?.value === 'all' || !filter
                ? (
                    <Box><strong>Done:</strong> {finished.length}</Box>
                )
                : null}
            {filter?.value === 'todo' || filter?.value === 'all' || !filter
                ? (
                    <Box><strong>Todo:</strong> {todo.length}</Box>
                )
                : null}
        </Box>
    );
};

export default Counter;