import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//import './index.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch
} from "react-router-dom"

/*
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
*/

ReactDOM.createRoot(document.getElementById('root')).render(
<Router><App /></Router>)