import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export const Receptor_planillas = (value_list) => {



    let stackElement = value_list.lista.map(stack => {
        console.log('ooooooooo')
        console.log(stack)
        return <Chip label={stack.title} onDelete={(e) => { value_list.cambio(e, stack) }} />
    }

    )

    return (

        <Stack direction="row" spacing={1}>
            {stackElement}
        </Stack>
    );
}
