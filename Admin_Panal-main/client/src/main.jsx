import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
// Using a more reliable font-awesome path if possible, or just standard
import 'font-awesome/css/font-awesome.min.css';
import './styles/admin.css';
import { AuthProvider } from './context/AuthContext';

console.log("React: Root mounting...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("React Error: Root element not found!");
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>,
  );
}
