import React from 'react';
import { Autocomplete } from '@mui/lab';
import { OnChangeValue } from 'react-select';
import { Box, TextField } from '@mui/material';
import { SelectedInputInterface } from '../types';

export interface FilterStateInterface {
    filters: SelectedInputInterface[];
}

interface Props {
    state: FilterStateInterface;
    handleStateChange: (option: OnChangeValue<SelectedInputInterface, false>) => void;
}

const filtersOptions = [
    {value: 'all', label: 'All'},
    {value: 'done', label: 'Done'},
    {value: 'todo', label: 'Todo'},
];

const Filters: React.FC<Props> = ({
    state, handleStateChange,
}: Props) => {
    const filter = state.filters.length ? state.filters[0] : null;

    return (
        <Box p={2} color='#171722' padding={'10px 0'} marginBottom={'20px'}>
            <Box display={'flex'} alignItems={'start'}>
                Filters
            </Box>
            <Box>
                <Autocomplete
                    loading={false}
                    options={filtersOptions}
                    getOptionLabel={(option) => option.label}
                    onChange={(event: any, newValue) => handleStateChange(newValue)}
                    renderInput={(params) =>
                        <TextField
                            name='Filter'
                            {...params}
                            variant='outlined'
                            value={{
                                value: filter,
                                label: 'Filter',
                            }}
                            size='small'
                        />
                    }
                />
            </Box>
        </Box>
    );
};

export default Filters;