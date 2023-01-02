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
          <Route path='/' exact={true} element={<LoginComponents />} />
          <Route path='/clan' exact={true} element={<ClanComponent />} />
          <Route path='/player' exact={true} element={<PlayerComponent />} />
          <Route path='/clanMember' exact={true} element={<Members />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
