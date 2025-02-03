import {ReactKeycloakProvider} from '@react-keycloak/web'
import { createRoot } from 'react-dom/client'
import keycloak from './keycloack.js'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <ReactKeycloakProvider authClient={keycloak}
    initOptions={{
      onLoad: 'login-required', cheackloginIframe: false
    }}>
    <App />
  </ReactKeycloakProvider>
)
