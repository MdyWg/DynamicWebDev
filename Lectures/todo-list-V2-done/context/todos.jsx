import {createContext, useState, useCallback} from 'react'

// createContext makes a channel, nothing in it yet
const TodosContext = createContext()

/// Provider is an ordinary compoent. Everything used to live in App 
// lives here now (the state, and the five functions that actually change it)
const Provider = (props) => {
    const children = props
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // this will need useCallback once we see the jslint warning

    // useCallback: give me back the same function object every time, unless the things in the array change.
    // fetchTodos goes in a useEffect dependency array in App, and a function rebuilt every render is a new value 
    // every render, which would make that effect run forever, [] here in useCallback means "never rebuild this function, it has no dependencies"
    const fetchTodos = useCallback(async () => {
        try {
            const todos = await fetchTodos()
            setTodos(todos)
        } catch (error) {
            // the usual cause: you forgot to start the server in the second tab
            console.error(error)
            setError('Could not reach the server. Is `npm run server` running?')
        }
         finally {
            setIsLoading(false)
        }
    }, [])

    const createTodo = async (title) => {
        // the server makes the id now, so we no longer invent one
        const newTodo = await createTodoRequest(title)
        const updatedTodos = [...todos, newTodo]
        setTodos(updatedTodos)
    }

    const toggleTodoById = async (id, done) => {
        // same shape as every other one: ask the server, then map the answer in 
        const updated = await toggleTodoRequest(id, done)
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return updated
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    // this is still an object! if the key and value are the same, you can just write it once.
    const valueToShare = {
        todos, 
        isLoading,
        error,
        fetchTodos,
        createTodo,
        deleteTodoById,
        editTodoById,
        toggleTodoById
    }

    return <TodosContext.Provider value={{}}>{children}</TodosContext.Provider>
}

export {Provider}
export default TodosContext