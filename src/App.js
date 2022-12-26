import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginComponents from './components/LoginComponents/LoginComponents.tsx';
import ClanComponent from './components/ClanComponents/ClanComponent.tsx';
import PlayerComponent from './components/PlayerComponent/PlayerComponent.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LoginComponents />} />
          <Route path='/clan' element={<ClanComponent />} />
          <Route path='/clan' element={<PlayerComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
