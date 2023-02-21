import './App.css';
import Board from './components/Board'
import { Routes, Route } from 'react-router-dom';
import UserRegistration from './components/UserRegister'

function App() {
  

  return (
    <div className="App">
      <Routes>
          <Route path='/game' element={<Board/>}/>
          <Route path="/registration" element={<UserRegistration/>}/>
      </Routes>
      </div>
  );
}

export default App;
