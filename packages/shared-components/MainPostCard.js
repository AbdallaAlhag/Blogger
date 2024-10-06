import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
// eslint-disable-next-line react/prop-types
const PostCardLoader = ({ isLarge }) => {
  const width = isLarge ? 1000 : 500; // Dynamic width based on isLarge
  const height = isLarge ? 600 : 300; // Dynamic height based on isLarge
  return _jsx(ContentLoader, {
    speed: 2,
    width: width,
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    backgroundColor: '#E0F2FE',
    foregroundColor: '#1D4ED8',
    children: _jsx('rect', {
      x: '0',
      y: '0',
      rx: '0',
      ry: '0',
      width: width,
      height: height,
    }),
  });
};
const PostCard = ({
  id,
  title,
  content,
  author,
  createdAt,
  image,
  isLarge = false,
}) => {
  const [loading, setLoading] = useState(true);
  return _jsxs('div', {
    className:
      'relative overflow-hidden rounded-lg shadow-lg hover:transition hover:duration-100 hover:ease-in-out hover:translate-y-[-5px] hover:opacity-90',
    children: [
      loading && _jsx(PostCardLoader, { isLarge: isLarge }),
      ' ',
      _jsx('img', {
        className: 'w-full h-full object-cover',
        src:
          image === 'default-image.png'
            ? isLarge
              ? `https://picsum.photos/seed/${id}/1000/610`
              : `https://picsum.photos/seed/${id}/500/300`
            : isLarge
              ? `${image}?w=1000&h=610`
              : `${image}?w=500&h=300`,
        alt: title,
        onLoad: () => setLoading(false),
      }),
      _jsx('div', {
        className:
          'absolute inset-0 bg-gradient-to-t from-black/70 to-transparent',
        children: _jsxs('div', {
          className: 'absolute bottom-0 left-0 right-0 p-6',
          children: [
            _jsx('h2', {
              className: `font-bold text-white mb-2 ${isLarge ? 'text-3xl' : 'text-xl'}`,
              children: title,
            }),
            ' ',
            _jsxs('p', {
              className: 'text-sm text-gray-200 mb-4',
              children: [content.split(' ').slice(0, 15).join(' '), '...'],
            }),
            _jsx(Link, {
              to: `/article/${id}`,
              className:
                'inline-block px-4 py-2 bg-white text-blue-500 font-semibold rounded hover:bg-blue-500 hover:text-white transition duration-300',
              children: 'Read More',
            }),
          ],
        }),
      }),
    ],
  });
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
