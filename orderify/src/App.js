import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LogIn from './Component/Auth/LogIn';
import Registration from './Component/Auth/Registration';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './Component/User Page/Home/Home';
import Dashboard from './Component/User Page/Dashboard';
import ProtectedHome from './Component/Private/ProtectedHome';
import ProtectedLogIn from './Component/Private/ProtectedLogIn';
import Auth from './Component/Auth/Auth';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer pauseOnHover={false} autoClose={2000} />
      <Routes>
        {/* Log In Routes */}
        <Route path="/" element={<ProtectedLogIn Component={Auth} />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Registration />} />
        </Route>
        {/* <Route index element={<ProtectedLogIn Component={LogIn} />} />
        <Route path="/login" element={<ProtectedLogIn Component={LogIn} />} />
        <Route path="/register" element={<ProtectedLogIn Component={Registration} />} /> */}

        {/* Main Dashboard Routes */}
        <Route path='/' element={<ProtectedHome Component={Dashboard} />}>
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
