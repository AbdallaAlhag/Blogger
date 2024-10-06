import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header, Footer, CommentSection } from '@shared';
import ContentLoader from 'react-content-loader';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ImageLoader = (props) => (_jsx(ContentLoader, { speed: 2, width: 1500, height: 850, viewBox: "0 0 1500 850", backgroundColor: "#E0F2FE", foregroundColor: "#1D4ED8", ...props, children: _jsx("rect", { x: "0", y: "0", rx: "24", ry: "24", width: "1500", height: "850" }) }));
const ArticlePage = () => {
    const { id } = useParams(); // Get the post ID from the URL params
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Local loading state
    useEffect(() => {
        axios
            .get(`http://localhost:3000/posts/${id}`) // Fetch post by ID
            .then(({ data }) => {
            setPost(data);
            setIsLoading(false);
        })
            .catch((error) => {
            setError(error.message);
            setIsLoading(false);
        });
    }, [id]);
    if (isLoading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    if (!post) {
        return _jsx("div", { children: "No post found" });
    }
    return (_jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Header, {}), _jsxs("div", { className: "container flex-grow mx-auto px-4 py-8", children: [_jsxs("div", { className: "image-container relative w-full h-0 pb-[56.25%] mb-6 overflow-hidden", children: [loading && _jsx(ImageLoader, {}), _jsx("img", { className: `absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`, src: post.image === 'default-image.png'
                                    ? `https://picsum.photos/seed/${id}/1200/675`
                                    : post.image, alt: post.image, onLoad: () => setLoading(false) })] }), _jsx("h1", { className: "text-4xl font-extrabold", children: post.title }), _jsxs("p", { className: "mt-2 text-gray-600 mb-4", children: ["Written by ", post.author.name, " on", ' ', new Date(post.createdAt).toLocaleDateString()] }), _jsx("div", { className: "text-lg", children: post.content.split('\n').map((paragraph, index) => (_jsx("p", { className: "mb-4  max-w-screen-small sm:max-w-screen-2xl leading-relaxed text-justify", children: paragraph }, index))) }), _jsx("div", { className: "mt-8", children: _jsx(Link, { to: "/", children: _jsx("button", { type: "button", className: "text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center", children: "\u21A9 Back" }) }) }), _jsx("hr", { className: "my-12 border-gray-300" }), _jsx(CommentSection, { comments: post.comments, blogId: id })] }), _jsx(Footer, {})] }));
};
export default ArticlePage;
