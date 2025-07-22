import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import 'flowbite'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
