import React from 'react';
import './App.css';
import Header from './Header/Header';
import Profile from './Profile/Profile';
import NavBar from './NavBar/NavBar';
import Dialogs from './Dialogs/Dialogs';
import { Route, Routes } from 'react-router-dom';

const App = ({ state , dispatch}) => {
  return (
    <div className="app__wrapper">
      <Header />
      <NavBar />
      <div className='app__wrapper_content'>
        <Routes>
          <Route path="/profile" element={<Profile state={state.profilePage} dispatch={dispatch} />} />
          <Route path="/dialogs" element={<Dialogs state={state.dialogsPage} dispatch={dispatch} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
