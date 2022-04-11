import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material'

/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
export default function Top5ItemEdit(props) {
    const { key, text, index } = props;
    const { store } = useContext(GlobalStoreContext);
    const [currentText, setText] = useState(text);

    function handleUpdateText(event) {
        setText(event.target.value);
        store.updateItem(index, event.target.value);
    }

    return (
            <ListItem
                id={'item-' + (index+1)}
                key={props.key}
                sx={{ display: 'flex', p: 1 }}
                style={{
                    fontSize: '48pt',
                    width: '100%'
                }}
            >
            <div className="item-number"><Typography variant="h4">{index + 1}:</Typography></div>
            <TextField
                    required
                    fullWidth
                    id={key}
                    name="name"
                    className="edit-card"
                    onChange={handleUpdateText}
                    defaultValue={currentText}
                    inputProps={{style: {fontSize: 24}}}
                    InputLabelProps={{style: {fontSize: 24, padding: 0}}}
                />
            </ListItem>
    )
}