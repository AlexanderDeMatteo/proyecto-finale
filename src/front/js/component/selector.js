import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';


export default function Planilla(value_lista) {

    const [lalista, setLalista] = React.useState(value_lista.lista)
    const defaultProps = {
        options: lalista,
        getOptionLabel: (option) => option.title,
    };

    // function handleSelect(event, value) {
    //     console.log(event)
    //     console.log(value)
    //     console.log("Aaaaaaaaaaa")


    // }

    const flatProps = {
        options: lalista.map((option) => option.title),
    };

    const [value, setValue] = React.useState(null);

    return (
        <Stack spacing={1} sx={{ width: 300 }}>
            <Autocomplete
                onChange={value_lista.cambio}
                {...defaultProps}
                id="disable-close-on-select"
                disableCloseOnSelect
                renderInput={(params) => (
                    <TextField {...params} label="seleccion de tags" variant="standard" />
                )}
            />
        </Stack>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//     { title: "Schindler's List", year: 1993 },
//     { title: 'Pulp Fiction', year: 1994 },
// ];
