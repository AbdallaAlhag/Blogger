import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { MessageCircle } from 'lucide-react';
import parse from 'html-react-parser';

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
  comments: number;
};

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  content,
  image,
  comments,
}) => {
  const [loading, setLoading] = useState(true); // Local loading state
  const imagePath = image.slice(8);
  // const PORT: number | string = import.meta.env.VITE_PORT ?? 3000;
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:";
  // console.log(imagePath);
  const imageUrl =
    image === 'default-image.png'
      ? `https://picsum.photos/seed/${id}/500/300`
      : // `${import.meta.env.VITE_DOMAIN}/uploads/${imagePath}`;
        // `${API_URL}${PORT}/uploads/${imagePath}`;
        `${API_URL}/uploads/${imagePath}`;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden  hover:transition hover:duration-100 hover:ease-in-out hover:translate-y-[-5px] hover:opacity-90">
      <div className="p-0">
        {loading && <PostCardLoader />}
        <img
          className="w-full object-cover mb-4 rounded-t-lg h-[300px]"
          src={imageUrl}
          alt="Post image"
          onLoad={() => setLoading(false)} // Hide loader when image loads
        />
        <div className="px-6 py-0">
          {/* <h2 className="text-xl font-semibold mb-2 items-center flex justify-between line-clamp-1">
            {title}
            <div className="flex items-center">
              <MessageCircle size={20} className="text-gray-500 mr-2" />
              {comments && (
                <span className="text-gray-500 ml-2">{comments}</span>
              )}
            </div>
          </h2> */}
          <h2 className="text-xl font-semibold mb-2 flex justify-between items-center whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="overflow-hidden text-ellipsis">{title}</span>
            <div className="flex items-center ml-4 whitespace-nowrap">
              <MessageCircle size={20} className="text-gray-500 mr-2" />
              {comments && (
                <span className="text-gray-500 ml-2">{comments}</span>
              )}
            </div>
          </h2>

          {/* <div className="text-gray-600 mb-4 ">
            {content.split(' ').length > 15 ? (
              <>{parse(content.split(' ').slice(0, 15).join(' '))}...</>
            ) : (
              parse(content)
            )}
          </div> */}
          <div className="text-gray-600 mb-4">
            {content.split(' ').length > 15 ? (
              <>{parse(content.split(' ').slice(0, 15).join(' '))}...</>
            ) : (
              <div
                className="line-clamp-2 overflow-hidden text-ellipsis"
                style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical' }}
              >
                {parse(content)}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500 gap"></div>
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
  comments: PropTypes.number.isRequired,
};

export default PostCard;
