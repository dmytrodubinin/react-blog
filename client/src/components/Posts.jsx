import PropTypes from 'prop-types';
import Card from './Card';

const Posts = ({ posts }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:w-3/4 lg:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => {
        return <Card key={post._id} post={post} />;
      })}
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      photo: PropTypes.string,
      username: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

export default Posts;
