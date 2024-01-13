import { createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/login';
import { User } from './pages/user';

export const route = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/user/:userId',
    element: <User />,
  },
]);
