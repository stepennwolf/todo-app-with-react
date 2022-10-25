import React from 'react';
import request from '../../utils/request'
import PropTypes from 'prop-types';


/**
 * Intended to manage the state of Todo app and data fetch logic
 */
export function TodoAppDataService ({ apiHost, children }) {
    const [isLoading, setLoading] = React.useState(false);
    const [todos, setTodos] = React.useState([]);

    // --------------------------------------
    // Data fetch callbacks
    // --------------------------------------
    const getTodoList = (filter = null) => {
        setLoading(true);

        let query = '';

        if (filter !== null) {
            query = `?completed=${filter}`
        }

        request('GET', `${apiHost}/v1/todos${query}`)
            .then(res => {
                setLoading(false);
                setTodos(res.todos)
            })
            .catch(err => console.error(err)) // TODO: provide better solution
    }

    const createTodoItem = (title) => {
        setLoading(true);

        request('POST', `${apiHost}/v1/todos`, { title })
            .then(res => {
                setLoading(false);
                setTodos([res.todo, ...todos]);
            })
            .catch(err => console.error(err)) // TODO: provide better solution
    }

    const markTodoItem = (todoId, completed) => {
        setLoading(true);

        request('PATCH', `${apiHost}/v1/todos/${todoId}`, { completed })
            .then(res => {
                setLoading(false);
                setTodos(todos.map(todo => todo.id === todoId ? res.todo : todo));
            })
            .catch(err => console.error(err)) // TODO: provide better solution
    }

    const deleteTodoItem = (todoId) => {
        setLoading(true);

        request('DELETE', `${apiHost}/v1/todos/${todoId}`)
            .then(() => {
                setLoading(false);
                setTodos(todos.filter(todo => todo.id !== todoId));
            })
            .catch(err => console.error(err)) // TODO: provide better solution
    }

    // load todos list on component mount
    React.useEffect(() => {
        getTodoList();
    }, []);

    return children({
        isLoading,
        todos,
        getTodoList,
        createTodoItem,
        markTodoItem,
        deleteTodoItem,
    });
}


TodoAppDataService.propTypes = {
    children: PropTypes.func.isRequired,
    apiHost: PropTypes.string.isRequired,
}


export default TodoAppDataService;
