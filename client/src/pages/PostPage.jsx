import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Sidebar } from '../components';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const PF = 'http://localhost:5000/images/';
  const { user } = useContext(Context);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mx-auto flex max-w-screen-2xl flex-col justify-between gap-8 py-4 md:flex-row">
        <section className="w-full">
          {post.photo && (
            <figure>
              <img
                className="h-56 w-full rounded-lg object-cover"
                src={PF + post.photo}
                alt="title"
              />
            </figure>
          )}
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="w-full"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="my-4 text-3xl font-bold">
              {title}
              {post.username === user?.username && (
                <div className="float-right flex">
                  <FaEdit
                    className="h-5 w-5 cursor-pointer text-primary"
                    onClick={() => setUpdateMode(true)}
                  />
                  <FaTrash
                    className="h-5 w-5 cursor-pointer text-error"
                    onClick={handleDelete}
                  />
                </div>
              )}
            </h1>
          )}

          <div className="mb-4 flex justify-between">
            <p>
              Author:
              <Link to={`/?user=${post.username}`} className="link">
                {post.username}
              </Link>
            </p>
            <p>{new Date(post.createdAt).toDateString()}</p>
          </div>
          {updateMode ? (
            <textarea
              className="w-full"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <p className="">{desc}</p>
          )}
          {updateMode && (
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          )}
        </section>
        <Sidebar />
      </div>
    </>
  );
};

export default PostPage;
