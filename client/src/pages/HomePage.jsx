import { useEffect, useState } from 'react';
import { Hero, Posts, Sidebar } from '../components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/api/posts/' + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Hero />
      <div className="container mx-auto flex max-w-screen-2xl flex-col justify-between gap-8 py-4 md:flex-row">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default HomePage;
