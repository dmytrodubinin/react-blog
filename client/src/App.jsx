import { useContext } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { SharedLayout } from './layouts';
import {
  HomePage,
  LoginPage,
  PostPage,
  RegisterPage,
  WritePage,
  ProfilePage,
} from './pages';
import { Context } from './context/Context';

function App() {
  const { user } = useContext(Context);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <SharedLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'post/:id',
          element: <PostPage />,
        },
        {
          path: 'login',
          element: user ? <HomePage /> : <LoginPage />,
        },
        {
          path: 'register',
          element: user ? <HomePage /> : <RegisterPage />,
        },
        {
          path: 'write',
          element: user ? <WritePage /> : <RegisterPage />,
        },
        {
          path: 'profile',
          element: user ? <ProfilePage /> : <RegisterPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
