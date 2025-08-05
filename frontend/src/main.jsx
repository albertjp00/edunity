import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google'
const clientId = "310531477100-7k8bi6hl4241kvk7ov1rkoqn25p1dim8.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId = {clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
