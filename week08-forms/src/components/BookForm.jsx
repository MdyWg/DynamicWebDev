import {useState} from 'react'

const EMPTY = {
  title: '',
  author: '',
  pages: '',
  format: 'paperback',
  finished: false,
  rating: 3,
  dateStarted: '',
  notes: '',
}

const BookForm = (props) => {
  const {onAdd} = props
  const [values, setValues] = useState(EMPTY)

  const handleChange = (event) => {
    const {name, value, type, checked} = event.target
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Cast on the way OUT, in one place. Numbers stored as strings are the
    // reason your sort puts "10" before "9".
    onAdd({
      ...values,
      pages: Number(values.pages) || 0,
      rating: Number(values.rating),
    })

    // setting state back to EMPTY clears every field, because every field
    // is reading its value from state
    setValues(EMPTY)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="author">
          Author
        </label>
        <input
          id="author"
          name="author"
          value={values.author}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="pages">
          Pages
        </label>
        <input
          id="pages"
          name="pages"
          type="number"
          min="1"
          value={values.pages}
          onChange={handleChange}
          className="mt-1 w-32 rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="format">
          Format
        </label>
        <select
          id="format"
          name="format"
          value={values.format}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        >
          <option value="paperback">Paperback</option>
          <option value="hardback">Hardback</option>
          <option value="ebook">Ebook</option>
          <option value="audio">Audiobook</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            name="finished"
            type="checkbox"
            checked={values.finished}
            onChange={handleChange}
            className="h-4 w-4"
          />
          Finished it
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="rating">
          Rating: {values.rating}/5
        </label>
        <input
          id="rating"
          name="rating"
          type="range"
          min="1"
          max="5"
          value={values.rating}
          onChange={handleChange}
          className="mt-1 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="dateStarted">
          Started
        </label>
        <input
          id="dateStarted"
          name="dateStarted"
          type="date"
          value={values.dateStarted}
          onChange={handleChange}
          className="mt-1 rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          value={values.notes}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <button className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700">
        Add book
      </button>
    </form>
  )
}

export default BookForm