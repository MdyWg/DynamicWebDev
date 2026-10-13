// 1. If the get was in the component body (every render) instead of [], then the app would render
// and then get runs, then there's a response and setTodos runs, which triggers a re-render, calling get again, causing a loop
// 2. The todo would be removed even before the server responds. When server is down, todo does disappear but the await request fails
// and when refreshing, the todo will be back because it was never deleted on server end.
// 3. filter didn't need a request because each todo already has a todos state so we can just filter with data we have 
// instead of asking the server
import {useState, useEffect} from 'react'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import {
  fetchTodos,
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  updateTodo as updateTodoRequest,
  toggleTodo as toggleTodoRequest
} from './api'

const App = () => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')

  // [] = run once, when the component first appears. NOT every render --
  // that would fetch, set state, re-render, fetch again, forever.
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todos = await fetchTodos()
        setTodos(todos)
      } catch (err) {
        // the usual cause: you forgot to start the server in the second tab
        console.error(err)
        setError('Could not reach the server. Is `npm run server` running?')
      } finally {
        setIsLoading(false)
      }
    }
    loadTodos()
  }, [])

  const createTodo = async (title) => {
    // the server makes the id now, so we no longer invent one
    const newTodo = await createTodoRequest(title)
    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
  }

  const deleteTodoById = async (id) => {
    // ask the server first. If it refuses, we never touch our state, and the
    // screen keeps telling the truth.
    await deleteTodoRequest(id)

    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(updatedTodos)
  }

  const editTodoById = async (id, newTitle) => {
    // find the whole todo and send all of it, because PUT replaces
    const todo = todos.find((todo) => todo.id === id)
    const updated = await updateTodoRequest({...todo, title: newTitle})

    // map returns a new array the SAME length. Every todo comes back; the one
    // we edited comes back as the object the SERVER sent us.
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return updated
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const toggleTodoById = async (id) => {
    const todo = todos.find((todo) => todo.id === id)
    const updated = await toggleTodoRequest(todo)
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return updated
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Active') {
      return !todo.done
    }
    if (filter === 'Done') {
      return todo.done
    }
    return true
  })

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <TodoCreate onCreate={createTodo} />
      {isLoading && <p className="text-gray-500">Loading your todos...</p>}

      {error && (
        <p className="rounded bg-red-50 p-3 text-red-700">{error}</p>
      )}

      {!isLoading && !error && todos.length === 0 ? (
        <p className="text-gray-500">Nothing yet. Add something above.</p>
      ) : (
        <>
          <div className="flex mb-4">
            {['All', 'Active', 'Done'].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 ${filter === status ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
          <TodoList todos={filteredTodos} onDelete={deleteTodoById} onEdit={editTodoById} onToggle={toggleTodoById} />
        </>
      )}

      <p className="mt-6 text-sm text-gray-500">
        {todos.length} {todos.length === 1 ? 'thing' : 'things'} to do
      </p>
    </div>
  )
}

export default App
