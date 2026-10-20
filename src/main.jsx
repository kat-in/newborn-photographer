import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";

import './index.css'
import App from './App.jsx'

// Статический хостинг отдаёт /gallery/ из папки /gallery/index.html.
// Без редиректа путь /gallery дал бы 404, поэтому приводим адреса к виду с слешем.
const { pathname, search, hash } = window.location
if (pathname !== '/' && !pathname.endsWith('/') && !pathname.includes('/.')) {
  window.location.replace(`${pathname}/${search}${hash}`)
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}
