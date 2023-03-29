import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './store/authContext';
import './App.css';

import Header from './components/Header';
import Auth from './components/Auth';
import Home from './components/Home';
import AddReference from './components/AddReference';


function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      {authCtx.token ? <Header /> : null}
      
      <Routes>
        <Route index element={!authCtx.token ? <Auth/> : <Navigate to='home'/>}/>
        <Route path='/home' element={authCtx.token ? <Home/> : <Navigate to='auth'/>}/>
        <Route path='/add' element={authCtx.token ? <AddReference/> : <Navigate to='auth'/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  );
}

export default App;
