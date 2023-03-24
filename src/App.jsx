import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Auth from './components/Auth';
import Home from './components/Home';
import AddReference from './components/AddReference';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Auth/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/add' element={<AddReference/>} />
      </Routes>
    </div>
  );
}

export default App;
