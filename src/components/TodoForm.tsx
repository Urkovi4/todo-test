import React, { useState } from 'react'
import { Box, TextField } from '@mui/material';
import { AppState } from '../types';

interface Props {
    addTodo: (todo: string) => void;
    handleSnackbarColor: (msg: string, type: AppState['snackbar']['type']) => void;
}

const TodoForm: React.FC<Props> = ({
    addTodo, handleSnackbarColor,
}: Props) => {
    const [value, setValue] = useState('');
    const successMsg = 'Task created successfully.';
    const errMsg = 'The maximum message length should not exceed 50 characters.';

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value?.length < 50) {
            addTodo(value);
            setValue('');
            handleSnackbarColor(successMsg, 'success');
        } else {
            handleSnackbarColor(errMsg, 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='todo-form'>

            <Box display={'flex'} justifyContent={'space-between'} p={4} padding={'0'} width={'100%'}>
                <Box minWidth={'320px'}>
                    <TextField
                        fullWidth
                        size='small'
                        value={value}
                        label='Task'
                        variant='outlined'
                        className='todo-input'
                        placeholder='Type your task'
                        onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                e.preventDefault(); setValue(e.target.value);
                            }
                        }
                    />
                </Box>
                <Box>
                    <button type='submit' className='todo-btn'>Add New</button>
                </Box>
            </Box>
        </form>
    );
};

export default TodoForm;