import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/appRouter"; // ✅ Import the router
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
