import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Services from './pages/Services';
import Profile from './pages/Profile';
import User from './pages/User';
import Notifications from './pages/Notifications';

function App() {

  return (
    <div className="relative h-[100vh] overflow-hidden ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/services" element={<Services />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/user/:id" element={<User />}/>
          <Route path="/notifications" element={<Notifications />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
