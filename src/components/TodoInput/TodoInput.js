import React from 'react';
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";



export function TodoInput({ onTodoEnter }) {
    const [inputValue, setInputValue] = React.useState('');

    const onFormSubmit = (event) => {
        event.preventDefault();
        onTodoEnter(inputValue);
        setInputValue('');
    }

    return (
        <form name="todo-item-form" onSubmit={onFormSubmit}>
            <TextField
                fullWidth
                autoFocus
                autoComplete="off"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                label="Add a new todo"
                variant="standard"
            />
        </form>
    );
}

TodoInput.propTypes = {
    onTodoEnter: PropTypes.func.isRequired,
};


export default TodoInput;
