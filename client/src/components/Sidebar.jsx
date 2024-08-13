import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaFacebook, FaGithub, FaHashtag } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCatsWithCounts = async () => {
      try {
        const res = await axios.get('/api/categories/with-post-counts');
        // Filter out categories with zero posts
        const filteredCats = res.data.filter((cat) => cat.postCount > 0);
        setCats(filteredCats);
      } catch (error) {
        console.error(error);
      }
    };
    getCatsWithCounts();
  }, []);

  return (
    <div className="w-full rounded-2xl bg-base-200 p-2 md:w-1/4">
      <div className="mb-8">
        <div className="mb-4">
          <hr />
          <h2 className="text-center text-2xl font-bold">About Me</h2>
          <hr />
        </div>
        <img
          className="max-h-52 w-full rounded-2xl object-cover"
          src="https://images.pexels.com/photos/1549004/pexels-photo-1549004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="mb-8">
        <div className="mb-4">
          <hr />
          <h2 className="text-center text-2xl font-bold">Categories</h2>
          <hr />
        </div>
        <div className="flex flex-wrap gap-2">
          {cats.map((cat) => (
            <Link
              key={cat._id}
              to={`/?cat=${cat.name}`}
              className="btn btn-primary"
            >
              <FaHashtag />
              {cat.name}{' '}
              <span className="badge badge-outline ml-2">{cat.postCount}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <div className="mb-4">
          <hr />
          <h2 className="text-center text-2xl font-bold">Follow Me</h2>
          <hr />
        </div>
        <div className="flex justify-center gap-4">
          <Link to="" className="btn btn-circle btn-outline">
            <FaFacebook className="text-3xl" />
          </Link>
          <Link to="" className="btn btn-circle btn-outline">
            <FaX className="text-3xl" />
          </Link>
          <Link to="" className="btn btn-circle btn-outline">
            <FaGithub className="text-3xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
