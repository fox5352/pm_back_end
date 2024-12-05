import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import './App.css';

import Home from './pages/Home/Home';
import Live from './pages/Live/Live';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="live" element={<Live />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RootLayout() {
  return (
    <div data-tauri-drag-region>
      <Outlet />
    </div>
  );
}

export default App;
