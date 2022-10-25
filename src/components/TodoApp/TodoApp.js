import PropTypes from "prop-types";
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {Box} from "@mui/material";
import { TodoInput } from '../TodoInput';
import { TodoList } from '../TodoList';
import './TodoApp.css';



export function TodoApp({ todos, getTodoList, createTodoItem, markTodoItem, deleteTodoItem }) {
    return (
        <section className="todo-app">
            <Box className="todo-app__header">
                <Box>
                    <Logo />
                </Box>
                <h1>Todo List</h1>
            </Box>
            <Box className="todo-app__body">
                <TodoInput onTodoEnter={createTodoItem} />
                <TodoList
                    todos={todos}
                    onTodoMark={markTodoItem}
                    onTodoDelete={deleteTodoItem}
                    onTodosFilterUpdate={getTodoList}
                />
            </Box>
        </section>
    );
}


TodoApp.propTypes = {
    isLoading: PropTypes.bool,
    todos: PropTypes.array,

    // callbacks
    getTodoList: PropTypes.func,
    createTodoItem: PropTypes.func,
    markTodoItem: PropTypes.func,
    deleteTodoItem: PropTypes.func,
};



TodoApp.defaultProps = {
    isLoading: false,
    todos: [],
    getTodoList: () => null,
    createTodoItem: () => null,
    markTodoItem: () => null,
    deleteTodoItem: () => null,
}

export default TodoApp;
