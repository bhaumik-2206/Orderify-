import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LogIn from './Component/Auth/LogIn';
import Registration from './Component/Auth/Registration';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './Component/User Page/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer pauseOnHover={false} autoClose={2000} />
      <Routes>
        <Route index element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
