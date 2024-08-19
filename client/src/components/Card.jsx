import PropTypes from 'prop-types';
import { FaHashtag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card = ({ post }) => {
  const PF = 'http://localhost:5000/images/';
  return (
    <div className="card card-compact max-h-[500px] bg-base-100 shadow-xl">
      {post.photo ? (
        <figure>
          <img
            className="max-h-80 w-full object-cover"
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
        <div className="card-actions flex-nowrap items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.categories.map((c) => (
              <div key={c}>
                <Link to={`/?cat=${c}`} className="btn btn-sm">
                  <span className="flex items-center">
                    <FaHashtag />
                    {c.toLowerCase()}
                  </span>
                </Link>
              </div>
            ))}
          </div>
          <Link to={`/post/${post._id}`} className="btn btn-primary">
            Read
          </Link>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    photo: PropTypes.string,
    username: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
