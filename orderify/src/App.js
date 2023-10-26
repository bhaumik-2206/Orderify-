import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProtectedLogIn from './route/ProtectedLogIn';
import Auth from './Component/auth/Auth';
import Registration from './Component/auth/Registration';
import Profile from './Component/user/profile/Profile';
import Dashboard from './Component/user/Dashboard';
import ProtectedHome from './route/ProtectedHome';
import LogIn from './Component/auth/LogIn';
import Home from './Component/user/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer pauseOnHover={false} autoClose={2000} />
      <Routes>
        {/* Log In Routes */}
        <Route path="/" element={<ProtectedLogIn Component={Auth} />}>
          <Route index element={<LogIn />} />
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
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;






// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProtectedRoute from './route/ProtectedRoute';
// // import Home from './Home';
// // import Login from './Login';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" component={LogIn} />
//         <ProtectedRoute path="/" component={Home} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
