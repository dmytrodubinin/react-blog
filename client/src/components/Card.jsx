import { FaHashtag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card = ({ img }) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img className="h-56 w-full object-cover" src={img} alt="title" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Post Title</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions items-center justify-between">
          <Link to="#" className="btn">
            <FaHashtag />
            React
          </Link>
          <Link to="#" className="btn btn-primary">
            Read
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
