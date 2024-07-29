import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-screen-2xl px-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default HomeLayout;
