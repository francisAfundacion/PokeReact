import logo from './logo.svg';
import './App.css';
import Pokemon from './components/Pokemon';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokeLista from './components/PokeLista';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pokemon/:id" element={<Pokemon />}/>
        <Route path="/" element = {<PokeLista />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
