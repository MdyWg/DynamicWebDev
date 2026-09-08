import React from 'react'
import ReactDOM from 'react-dom/client'
// import component to render in JSX
import App from './App.jsx'

// plain js find empty div in index.html
const el = document.getElementById('root')

// hand it over to react to inject JSX
const root = ReactDOM.createRoot(el)

// render our react project in the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
) 
