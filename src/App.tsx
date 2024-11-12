import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home/Home';
import Live from './pages/Live/Live';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='live' element={<Live />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
