import './App.css';
import { Routes, Route } from 'react-router-dom';
import UserRegistration from './components/UserRegister';
import Homepage from './components/Homepage';
import UserLogin from './components/UserLogin';
import Timer from './components/Timer.js';
import Mainboard from './components/Mainboard';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/login' element={<UserLogin/>}/>
          <Route path='/signup' element={<UserRegistration/>}/>
          <Route path='/timer' element={<Timer/>}/>
          <Route path='/game' element={<Mainboard/>}/>
          <Route path="/registration" element={<UserRegistration/>}/>
      </Routes>
      </div>
  );
}

export default App;
