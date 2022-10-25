import React from "react";
import PropTypes from "prop-types";
import {Box, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {ReactComponent as DeleteIcon} from "../../assets/delete.svg";
import Checkbox from "@mui/material/Checkbox";
import './TodoList.css';


const TODOS_FILTERS = [
    {
        label: 'All',
        value: null,
    },
    {
        label: 'Completed',
        value: true,
    },
    {
        label: 'Incompleted',
        value: false,
    }
];


export function TodoList ({ todos, onTodoMark, onTodoDelete, onTodosFilterUpdate }) {
    const [todosFilter, setTodosFilter] = React.useState(null);

    const onFilterUpdate = (filter) => {
        setTodosFilter(filter);
        onTodosFilterUpdate(filter)
    };

    // make sure that we're synchronized with filter state
    const filteredTodos = todosFilter !== null ? todos.filter(todo => todo.completed === todosFilter) : todos;
    const isTodoListEmpty = filteredTodos.length < 1;

    return (
        <>
            {isTodoListEmpty
                ? (
                    <Box pt={4} pb={2}>
                        <Typography variant="body1">Todo list is empty</Typography>
                    </Box>
                )
                : (
                    <List classes={{root: 'todo-list'}}>
                        {filteredTodos.map(({ title, completed, id }) => {
                            return (
                                <ListItem
                                    key={id}
                                    disablePadding
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="comments" onClick={() => onTodoDelete(id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemButton
                                        classes={{root: 'todo-list__item'}}
                                        disableGutters
                                        onClick={() => onTodoMark(id, ! completed)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={completed}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': id }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={id} primary={title} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                )
            }

            <Box className="todo-app__filters" pt={4}>
                <Typography mr={2} variant="span" className="todo-app__filters-label">Show:</Typography>
                {TODOS_FILTERS.map(({label, value}) =>
                    value === todosFilter
                        ? (
                            <Typography key={label} className="todo-app__filters-option" variant="span">
                                {label}
                            </Typography>
                        )
                        : (
                            <Link
                                key={label}
                                className="todo-app__filters-option"
                                component="button"
                                variant="body1"
                                onClick={() => onFilterUpdate(value)}
                            >
                                {label}
                            </Link>
                        )
                )}
            </Box>
        </>
    );
}


TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        completed: PropTypes.bool,
    })).isRequired,
    onTodoMark: PropTypes.func.isRequired,
    onTodoDelete: PropTypes.func.isRequired,
    onTodosFilterUpdate: PropTypes.func.isRequired,
};
