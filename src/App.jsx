import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './store/authContext';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Header from './components/Header';
import Auth from './components/Auth';
import Home from './components/Home';
import AddReference from './components/AddReference';
import ViewReference from './components/ViewReference';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      {authCtx.token ? <Header /> : null}
      
      <Routes>
        <Route index element={authCtx.token ? <Home/> : <Navigate to='/login'/>}/>
        <Route path='/add' element={authCtx.token ? <AddReference/> :   <Navigate to='/login'/>}/>
        <Route path='/view/:id/:edit' element={authCtx.token ? <ViewReference/> : <Navigate to='/login'/>}/>
        <Route path='/login' element={!authCtx.token ? <Auth/> : <Navigate to='/'/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>        
      </Routes>
    </div>
  );
}

export default App;
