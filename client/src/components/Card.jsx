import { FaHashtag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card = ({ post }) => {
  const PF = 'http://localhost:5000/images/';
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      {post.photo ? (
        <figure>
          <img
            className="max-h-80 w-full object-cover"
            // src={post.photo}
            src={PF + post.photo}
            alt="title"
          />
        </figure>
      ) : (
        <figure>
          <img
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{new Date(post.createdAt).toDateString()}</p>
        <p>{post.desc}</p>
        <div className="card-actions items-center justify-between">
          {post.categories.map((c) => (
            <div key={c}>
              <Link to={`/?cat=${c}`} className="btn">
                <FaHashtag />
                {c}
              </Link>
            </div>
          ))}
          <Link to={`/post/${post._id}`} className="btn btn-primary">
            Read
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
