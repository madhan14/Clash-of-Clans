import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginComponents from './components/LoginComponents/LoginComponents.tsx';
import ClanComponent from './components/ClanComponents/ClanComponent.tsx';
import PlayerComponent from './components/PlayerComponent/PlayerComponent.tsx';
import Members from './components/MembersComponents/MembersComponents.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LoginComponents />} />
          <Route path='/clan' element={<ClanComponent />} />
          <Route path='/player' element={<PlayerComponent />} />
          <Route path='/clanMember' element={<Members />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
