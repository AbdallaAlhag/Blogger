import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
const PostCardLoader = (props) =>
  _jsx(ContentLoader, {
    speed: 2,
    width: 500,
    height: 300,
    viewBox: '0 0 500 300',
    backgroundColor: '#E0F2FE',
    foregroundColor: '#1D4ED8',
    ...props,
    children: _jsx('rect', {
      x: '0',
      y: '60',
      rx: '24',
      ry: '24',
      width: '500',
      height: '300',
    }),
  });
const PostCard = ({ id, title, content, author, createdAt, image }) => {
  const [loading, setLoading] = useState(true); // Local loading state
  return _jsx('div', {
    className:
      'bg-white shadow-md rounded-lg overflow-hidden  hover:transition hover:duration-100 hover:ease-in-out hover:translate-y-[-5px] hover:opacity-90',
    children: _jsxs('div', {
      className: 'p-0',
      children: [
        loading && _jsx(PostCardLoader, {}),
        _jsx('img', {
          className: 'w-full object-cover mb-4 rounded-t-lg',
          src:
            image === 'default-image.png'
              ? `https://picsum.photos/seed/${id}/500/300`
              : image,
          alt: 'Post image',
          onLoad: () => setLoading(false),
        }),
        _jsxs('div', {
          className: 'px-6 py-0',
          children: [
            _jsx('h2', {
              className: 'text-xl font-semibold mb-2',
              children: title,
            }),
            _jsxs('p', {
              className: 'text-gray-600 mb-4',
              children: [content.split(' ').slice(0, 15).join(' '), '...'],
            }),
            _jsx('div', {
              className:
                'flex justify-between items-center text-sm text-gray-500 gap',
            }),
          ],
        }),
        _jsx(Link, {
          to: `/article/${id}`,
          className:
            'block bg-blue-500 text-white text-center py-2 hover:bg-blue-700 transition duration-300',
          children: 'Read More',
        }),
      ],
    }),
  });
};
PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
export default PostCard;
