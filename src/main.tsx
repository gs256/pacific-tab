import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'

if ('serviceWorker' in navigator && !__IS_EXTENSION__) {
  navigator.serviceWorker.register(
    import.meta.env.BASE_URL + 'image-cache-worker.js',
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
