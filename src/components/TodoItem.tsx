import React from 'react';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { TodoInterface } from '../types';

interface Props {
    task: TodoInterface;
    editTodo: (todo: string) => void;
    deleteTodo: (todo: string) => void;
    toggleComplete: (todo: string) => void;
}

const TodoItem: React.FC<Props> = ({
    task, deleteTodo, editTodo, toggleComplete,
}: Props) => {
    return (
        <Box className='todo'>
            <p
                onClick={() => toggleComplete(task.id)}
                className={`${task.status ? 'finished' : 'unfinished'}`}
            >
                {task.task}
            </p>
            <Box className='item-btns'>
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    className='edit-icon'
                    onClick={() => editTodo(task.id)}
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    className='delete-icon'
                    onClick={() => deleteTodo(task.id)}
                />
                <span
                    style={{
                        display: 'flex',
                        marginLeft: '5px',
                    }}
                >
                    <FiberManualRecordIcon
                        fontSize='small'
                        color={task.status ? 'success' : 'info'}
                    />
                </span>
            </Box>
        </Box>
    )
}

export default TodoItem;