import BookForm from './components/BookForm'

const App = () => {
  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Reading List</h1>
      <BookForm />
    </div>
  )
}

export default App