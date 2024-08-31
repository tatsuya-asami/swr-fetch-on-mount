import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

async function enableMocking() {
  const { worker } = await import("./api/browser");
  return worker.start();
}

enableMocking().then(()=>{
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}).catch((e)=>{
  console.error(e)
})
