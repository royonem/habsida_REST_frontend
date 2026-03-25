import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import UserPage from './pages/UserPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={
        <PrivateRoute requiredRole={["ROLE_ADMIN"]}>
          <AdminPage />
        </PrivateRoute>
      } />
      <Route path="/user" element={
        <PrivateRoute requiredRole={["ROLE_USER", "ROLE_ADMIN"]}>
          <UserPage />
        </PrivateRoute>
      } />

    </Routes>
  );
}

export default App;