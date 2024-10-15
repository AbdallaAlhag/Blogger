import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Footer, PostCard, LoadingErrorHandler, NoPostFound, } from '@shared';
const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('date');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        axios
            .get(`${baseURL}/posts-all`)
            .then(({ data }) => {
            const updatedPosts = data.map((post) => ({
                ...post,
                comments: post.comments || [],
            }));
            setPosts(updatedPosts);
            setIsLoading(false);
        })
            .catch((error) => {
            setError(error.message);
            setIsLoading(false);
        });
    }, [baseURL]);
    const sortPosts = (posts, sortBy) => {
        switch (sortBy) {
            case 'date':
                return [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            case 'comments':
                return [...posts].sort((a, b) => b.comments.length - a.comments.length);
            case 'title':
                return [...posts].sort((a, b) => a.title.localeCompare(b.title));
            default:
                return posts;
        }
    };
    const sortedPosts = sortPosts(posts, sortBy);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // if (isLoading) {
    //   return (
    //     <div className="flex justify-center items-center h-screen">
    //       Loading...
    //     </div>
    //   );
    // }
    // if (error) {
    //   return <div className="text-red-500 text-center">{error}</div>;
    // }
    return (_jsx(LoadingErrorHandler, { isLoading: isLoading, error: error, children: _jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Header, {}), _jsxs("main", { className: "container flex-grow mx-auto px-4 py-8", children: [_jsx("h1", { className: "text-4xl font-bold mb-8 text-center", children: "Published Blog Posts" }), _jsxs("div", { className: "mb-8 flex justify-end items-center", children: [_jsx("label", { htmlFor: "sort", className: "mr-2 text-gray-700", children: "Sort by:" }), _jsxs("select", { id: "sort", value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "border rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "date", children: "Date" }), _jsx("option", { value: "comments", children: "Comments" }), _jsx("option", { value: "title", children: "Title" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: currentPosts.length > 0 ? (currentPosts.map((post) => (_jsx("div", { children: _jsx(PostCard, { id: post.id, title: post.title, content: post.content, author: post.author.name, createdAt: post.createdAt, image: post.image, comments: post.comments.length }) }, post.id)))) : (_jsx(NoPostFound, {})) }), _jsx("div", { className: "mt-8 flex justify-center", children: _jsx("nav", { children: _jsx("ul", { className: "flex", children: Array.from({ length: Math.ceil(sortedPosts.length / postsPerPage) }, (_, i) => (_jsx("li", { children: _jsx("button", { onClick: () => paginate(i + 1), className: `mx-1 px-3 py-2 rounded-md ${currentPage === i + 1
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`, children: i + 1 }) }, i))) }) }) })] }), _jsx(Footer, {})] }) }));
};
export default BlogPage;
