import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProtectedLogIn from './route/ProtectedLogIn';
import Auth from './Component/auth/Auth';

import Profile from './Component/user/profile/Profile';
import Dashboard from './Component/user/Dashboard';


import LogIn from './Component/auth/LogIn';
import Registration from './Component/auth/Registration';
import Products from './Component/user/home/Products';
import CartContext from './context/CartContext';
import Order from './Component/user/order/Order';
import AdminPage from './Component/admin/AdminPage';
import PageNotFound from './Component/user/home/PageNotFound';



function App() {
  return (
    <CartContext>
      <BrowserRouter>
        <ToastContainer pauseOnHover={false} autoClose={1000} position="top-left" />
        <Routes>
          {/* Log In Routes */}
          <Route path="/" element={<ProtectedLogIn Component={Auth} />}>
            <Route index element={<LogIn />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Registration />} />
          </Route>
          {/* Main Dashboard Routes */}
          <Route path='/' element={<ProtectedLogIn Component={Dashboard} />}>
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<AdminPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Order />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CartContext >
  );
}

export default App;