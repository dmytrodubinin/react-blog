import { SharedLayout } from './layouts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage, LoginPage } from './pages';

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
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
