import React from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ExpensePage from './pages/ExpensePage';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LandingPage/>}/>
      <Route path="/login" index element={<LoginPage/>}/>
      <Route path="/expenses" index element={<ExpensePage/>}/>
      <Route path="/register" index element={<RegisterPage/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;