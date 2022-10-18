import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reunioes from './components/Reunioes';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:user' element={<Reunioes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
