import { Hero, Posts, Sidebar } from '../components';

const HomePage = () => {
  return (
    <>
      <Hero />
      <div className="container mx-auto flex max-w-screen-2xl flex-col justify-between gap-8 py-4 md:flex-row">
        <Posts />
        <Sidebar />
      </div>
    </>
  );
};

export default HomePage;
