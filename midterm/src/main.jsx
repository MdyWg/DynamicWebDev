import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {Provider} from './context/shows'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* Everything inside Provider can now reach the shows, at any depth */}
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
)
