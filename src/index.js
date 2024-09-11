import React from 'react';
import ReactDOM from 'react-dom/client'; // Asegúrate de usar 'react-dom/client' para React 18+
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import Landing from './components/Landing';
import Game from './components/Game';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Router>
      <Routes>
        <Route path="/" exact element={<Landing />}></Route>
        <Route path="/game" exact element={<Game />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
