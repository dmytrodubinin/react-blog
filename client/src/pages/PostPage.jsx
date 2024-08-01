import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Sidebar } from '../components';
import { useEffect, useState } from 'react';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);

  return (
    <>
      <div className="container mx-auto flex max-w-screen-2xl flex-col justify-between gap-8 py-4 md:flex-row">
        <section className="w-full">
          {post.photo ? (
            <figure>
              <img
                className="h-56 w-full rounded-lg object-cover"
                src={post.photo}
                alt="title"
              />
            </figure>
          ) : (
            <figure>
              <img
                className="h-56 w-full rounded-lg object-cover"
                src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="title"
              />
            </figure>
          )}

          <h1 className="my-4 text-3xl font-bold">{post.title}</h1>
          <p>
            Author:{' '}
            <Link to={`/?user=${post.username}`} className="link">
              {post.username}
            </Link>
          </p>
          <p>{new Date(post.createdAt).toDateString()}</p>
          <p>{post.desc}</p>
        </section>
        <Sidebar />
      </div>
    </>
  );
};

export default PostPage;
