import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import ExpensePage from './pages/ExpensePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<ExpensePage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
