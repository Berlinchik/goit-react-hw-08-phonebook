import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../redux/auth/auth-selectors';
import { Routes, Route, Navigate } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout';

const Home = lazy(() => import('../pages/Home'));
const Contacts = lazy(() => import('../pages/Contacts'));
const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));

const PrivateRoute = ({ component, redirectTo = '/login' }) => {
  const isAuth = useSelector(selectLoggedIn);
  return isAuth ? component : <Navigate to={redirectTo} />;
};
const PublicRoute = ({ component, redirectTo = '/' }) => {
  const isAuth = useSelector(selectLoggedIn);
  return !isAuth ? component : <Navigate to={redirectTo} />;
};

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        color: '#010101',
      }}
    >
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/contacts"
            element={<PrivateRoute component={<Contacts />} />}
          />
          <Route
            path="/register"
            element={<PublicRoute component={<Register />} />}
          />
          <Route
            path="/login"
            element={<PublicRoute component={<Login />} />}
          />
          <Route path="*" element={<Navigate to="/contacts" />} />
        </Route>
      </Routes>
    </div>
  );
};
