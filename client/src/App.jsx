import { SharedLayout } from './layouts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage, LoginPage, PostPage, RegisterPage } from './pages';

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
        path: '/post/:id',
        element: <PostPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
