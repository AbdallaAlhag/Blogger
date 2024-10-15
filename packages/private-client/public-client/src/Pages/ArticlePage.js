import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header, Footer, CommentSection, LoadingErrorHandler, NoPostFound, } from '@shared';
import ContentLoader from 'react-content-loader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
const ImageLoader = (props) => (_jsx(ContentLoader, { speed: 2, width: 1500, height: 850, viewBox: "0 0 1500 850", backgroundColor: "#E0F2FE", foregroundColor: "#1D4ED8", ...props, children: _jsx("rect", { x: "0", y: "0", rx: "24", ry: "24", width: "1500", height: "850" }) }));
const ArticlePage = () => {
    const { id } = useParams(); // Get the post ID from the URL params
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Local loading state
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        axios
            .get(`${baseURL}/posts/${id}`) // Fetch post by ID
            .then(({ data }) => {
            setPost(data);
            setIsLoading(false);
        })
            .catch((error) => {
            setError(error.message);
            setIsLoading(false);
        });
    }, [baseURL, id]);
    const unpublishPost = async (id) => {
        try {
            await axios.patch(`${baseURL}/posts/${id}/update`);
            navigate('/', { replace: true });
        }
        catch (error) {
            console.error('Error publishing post:', error);
        }
    };
    function confirmUserPost(postId, authorId) {
        const token = Cookies.get('token');
        if (postId && authorId && token) {
            // check if user is logged in and check if post.author.id = user id
            const decoded = jwtDecode(token);
            if (decoded && 'id' in decoded) {
                if (decoded.id === authorId) {
                    return true;
                }
            }
        }
        return false;
    }
    const handleEdit = (postId) => {
        // navigate(`/edit-article/${postId}`); // Navigate to the edit article page
        window.location.href = `${import.meta.env.VITE_PRIVATE_CLIENT_URL}/edit-blog/${postId}`;
    };
    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }
    // if (error) {
    //   return <div>Error: {error}</div>;
    // }
    if (!post) {
        return _jsx(NoPostFound, {});
    }
    const imagePath = post.image.slice(8);
    // console.log(imagePath);
    const imageUrl = post.image === 'default-image.png'
        ? `https://picsum.photos/seed/${id}/1200/675`
        : // `${import.meta.env.VITE_DOMAIN}/uploads/${imagePath}`;
            `http://localhost:3000/uploads/${imagePath}`;
    return (_jsx(LoadingErrorHandler, { isLoading: isLoading, error: error, children: _jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Header, {}), _jsxs("div", { className: "container flex-grow mx-auto px-4 py-8", children: [_jsxs("div", { className: "image-container relative w-full h-0 pb-[56.25%] mb-6 overflow-hidden", children: [loading && _jsx(ImageLoader, {}), _jsx("img", { className: `absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`, src: imageUrl, alt: post.image, onLoad: () => setLoading(false) })] }), _jsx("h1", { className: "text-4xl font-extrabold", children: post.title }), _jsxs("p", { className: "mt-2 text-gray-600 mb-4", children: ["Written by ", post.author.name, " on", ' ', new Date(post.createdAt).toLocaleDateString()] }), _jsx("div", { className: "text-lg", children: post.content.split('\n').map((paragraph, index) => (_jsx("div", { className: "mb-4  max-w-screen-small sm:max-w-screen-2xl leading-relaxed text-justify", children: parse(paragraph) }, index))) }), _jsxs("div", { className: "mt-8", children: [_jsx(Link, { to: "/", children: _jsx("button", { type: "button", className: "text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center", children: "\u21A9 Back" }) }), confirmUserPost(post.id, post.author.id) && (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", className: "text-white bg-purple-700 hover:bg-purple-900 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 ml-1 text-center inline-flex items-center", onClick: () => {
                                                if (id) {
                                                    unpublishPost(post.id);
                                                }
                                            }, children: "\uD83D\uDEAB Unpublish" }), _jsx("button", { type: "button", className: "text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 ml-1 text-center inline-flex items-center", onClick: () => handleEdit(post.id), children: "\u270E Edit" })] }))] }), _jsx("hr", { className: "my-12 border-gray-300" }), _jsx(CommentSection, { comments: post.comments, blogId: id })] }), _jsx(Footer, {})] }) }));
};
export default ArticlePage;
