import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { TodoInterface } from '../types';

interface Props {
    task: TodoInterface;
    editTodo: (task: string, id: string) => void;
}

const EditItem: React.FC<Props> = ({editTodo, task}: Props) => {
    const [value, setValue] = useState(task.task);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        editTodo(value, task.id);
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
                        placeholder='Update task'
                        onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                e.preventDefault(); setValue(e.target.value);
                            }
                        }
                    />
                </Box>
                <Box>
                    <button type='submit' className='todo-btn'>
                        Save
                    </button>
                </Box>
            </Box>
        </form>
    );
};

export default EditItem;