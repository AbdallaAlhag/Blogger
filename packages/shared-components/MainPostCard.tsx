import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

// eslint-disable-next-line react/prop-types
const PostCardLoader: React.FC<{ isLarge: boolean }> = ({ isLarge }) => {
  const width = isLarge ? 1000 : 500; // Dynamic width based on isLarge
  const height = isLarge ? 600 : 300; // Dynamic height based on isLarge

  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#E0F2FE"
      foregroundColor="#1D4ED8"
    >
      <rect x="0" y="0" rx="0" ry="0" width={width} height={height} />
    </ContentLoader>
  );
};
type PostCardProps = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  image: string;
  isLarge?: boolean;
};

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  content,
  author,
  createdAt,
  image,
  isLarge = false,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg hover:transition hover:duration-100 hover:ease-in-out hover:translate-y-[-5px] hover:opacity-90">
      {loading && <PostCardLoader isLarge={isLarge} />}{' '}
      {/* Pass isLarge to Loader */}
      <img
        className="w-full h-full object-cover"
        src={
          image === 'default-image.png'
            ? isLarge
              ? `https://picsum.photos/seed/${id}/1000/610`
              : `https://picsum.photos/seed/${id}/500/300`
            : isLarge
              ? `${image}?w=1000&h=610`
              : `${image}?w=500&h=300`
        }
        alt={title}
        onLoad={() => setLoading(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2
            className={`font-bold text-white mb-2 ${isLarge ? 'text-3xl' : 'text-xl'}`}
          >
            {title}
          </h2>{' '}
          <p className="text-sm text-gray-200 mb-4">
            {content.split(' ').slice(0, 15).join(' ')}...
          </p>
          <Link
            to={`/article/${id}`}
            className="inline-block px-4 py-2 bg-white text-blue-500 font-semibold rounded hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isLarge: PropTypes.bool,
};

export default PostCard;
