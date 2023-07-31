import React from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ExpensePage from './pages/ExpensePage';
import ActivatePage from './pages/ActivatePage';
import AccountPage from './pages/AccountPage';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SendResetPasswordEmail from './components/SendResetPasswordEmail';
import DeleteAccount from './components/DeleteAccount';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LandingPage/>}/>
      <Route path="/login" index element={<LoginPage/>}/>
      <Route path="/expenses" index element={<ExpensePage/>}/>
      <Route path="/register" index element={<RegisterPage/>}/>
      <Route path="/activate" index element={<ActivatePage/>}/>
      <Route path="/account" index element={<AccountPage/>}/>
      <Route path="/resetpassword" index element={<SendResetPasswordEmail/>}/>
      <Route path="/resetpassword2" index element={<ResetPasswordPage/>}/>
      <Route path ="/deleteaccount" index element={<DeleteAccount/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
