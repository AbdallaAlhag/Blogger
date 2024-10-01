import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  content,
  author,
  createdAt,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{author}</span>
          <span>{createdAt}</span>
        </div>
      </div>
      <Link
        to={`/post/${id}`}
        className="block bg-blue-500 text-white text-center py-2 hover:bg-blue-600 transition duration-300"
      >
        Read More
      </Link>
    </div>
  );
};

PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default PostCard;
