import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { InfiniteScroll } from './InfiniteScroll.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InfiniteScroll />
  </React.StrictMode>,
)
