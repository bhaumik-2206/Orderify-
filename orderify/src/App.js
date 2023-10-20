import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LogIn from './Component/Auth/LogIn';
import Registration from './Component/Auth/Registration';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './Component/User Page/Home/Home';
import Dashboard from './Component/User Page/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer pauseOnHover={false} autoClose={2000} />
      <Routes>
        <Route index element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Registration />} />
        <Route path='/' element={<Dashboard />}>
          <Route path="/home" element={<Home />} />
          <Route path="/order" element={<Home />} />
          <Route path="/history" element={<Home />} />
          <Route path="/profile" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
