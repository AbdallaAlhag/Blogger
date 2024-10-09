import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const PostCardLoader = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={500}
    height={300}
    viewBox="0 0 500 300"
    backgroundColor="#E0F2FE"
    foregroundColor="#1D4ED8"
    {...props}
  >
    <rect x="0" y="60" rx="24" ry="24" width="500" height="300" />
  </ContentLoader>
);

type PostCardProps = {
  id: string;
  title: string;
  content: string;
  image: string;
};

const PostCard: React.FC<PostCardProps> = ({ id, title, content, image }) => {
  const [loading, setLoading] = useState(true); // Local loading state

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden  hover:transition hover:duration-100 hover:ease-in-out hover:translate-y-[-5px] hover:opacity-90">
      <div className="p-0">
        {loading && <PostCardLoader />}
        <img
          className="w-full object-cover mb-4 rounded-t-lg"
          src={
            image === 'default-image.png'
              ? `https://picsum.photos/seed/${id}/500/300`
              : image
          }
          alt="Post image"
          onLoad={() => setLoading(false)} // Hide loader when image loads
        />
        <div className="px-6 py-0">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">
            {content.split(' ').slice(0, 15).join(' ')}...
          </p>
          <div className="flex justify-between items-center text-sm text-gray-500 gap">
            {/* <span>{author}</span>
            <span>{createdAt}</span> */}
          </div>
        </div>
        <Link
          to={`/article/${id}`}
          className="block bg-blue-500 text-white text-center py-2 hover:bg-blue-700 transition duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default PostCard;
