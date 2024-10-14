import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Footer, LoadingErrorHandler } from '@shared';
// import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, Eye } from 'lucide-react';
const AllBlogsPage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchPosts = async () => {
        try {
            const { data } = await axios.get(`${baseURL}/posts/admin`);
            setPosts(data);
            setIsLoading(false);
        }
        catch (error) {
            console.error('Error fetching posts:', error);
            setError('Failed to fetch posts. Please try again later.');
            setIsLoading(false);
        }
    };
    const sortPosts = (posts, sortBy, direction) => {
        return [...posts].sort((a, b) => {
            let comparison = 0;
            switch (sortBy) {
                case 'date':
                    comparison =
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    break;
                case 'comments':
                    comparison = b._count.comments - a._count.comments;
                    break;
                case 'title':
                    comparison = a.title.localeCompare(b.title);
                    break;
            }
            return direction === 'asc' ? comparison : -comparison;
        });
    };
    const handleSort = (newSortBy) => {
        if (newSortBy === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortBy(newSortBy);
            setSortDirection('desc');
        }
    };
    const handlePublishToggle = async (postId, currentStatus) => {
        try {
            await axios.patch(`${baseURL}/posts/${postId}/unpublish`, {
                published: !currentStatus,
            });
            setPosts(posts.map((post) => post.id === postId ? { ...post, published: !currentStatus } : post));
        }
        catch (error) {
            console.error('Error updating post status:', error);
            setError('Failed to update post status. Please try again.');
        }
    };
    const sortedPosts = sortPosts(posts, sortBy, sortDirection);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const SortIcon = ({ column }) => {
        if (sortBy !== column)
            return null;
        return sortDirection === 'asc' ? (_jsx(ChevronUp, { className: "inline w-4 h-4" })) : (_jsx(ChevronDown, { className: "inline w-4 h-4" }));
    };
    return (_jsx(LoadingErrorHandler, { isLoading: isLoading, error: error, children: _jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Header, {}), _jsxs("main", { className: "container mx-auto px-4 py-8 flex-grow", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Admin Blog Control" }), _jsx("div", { className: "overflow-x-auto bg-white shadow-md rounded-lg", children: _jsxs("table", { className: "min-w-full leading-normal", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: _jsxs("button", { onClick: () => handleSort('title'), className: "flex items-center", children: ["Title ", _jsx(SortIcon, { column: "title" })] }) }), _jsx("th", { className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Author" }), _jsx("th", { className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: _jsxs("button", { onClick: () => handleSort('date'), className: "flex items-center", children: ["Created At ", _jsx(SortIcon, { column: "date" })] }) }), _jsx("th", { className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: _jsxs("button", { onClick: () => handleSort('comments'), className: "flex items-center", children: ["Comments ", _jsx(SortIcon, { column: "comments" })] }) }), _jsx("th", { className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Status" }), _jsx("th", { className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Actions" })] }) }), _jsx("tbody", { children: currentPosts.map((post) => (_jsxs("tr", { children: [_jsx("td", { className: "px-5 py-5 border-b border-gray-200 bg-white text-sm", children: _jsx("p", { className: "text-gray-900 whitespace-no-wrap", children: post.title }) }), _jsx("td", { className: "px-5 py-5 border-b border-gray-200 bg-white text-sm", children: _jsx("p", { className: "text-gray-900 whitespace-no-wrap", children: post.author.name }) }), _jsx("td", { className: "px-5 py-5 border-b border-gray-200 bg-white text-sm", children: _jsx("p", { className: "text-gray-900 whitespace-no-wrap", children: new Date(post.createdAt).toLocaleDateString() }) }), _jsx("td", { className: "px-5 py-5 border-b border-gray-200 bg-white text-sm", children: _jsx("p", { className: "text-gray-900 whitespace-no-wrap", children: post._count.comments }) }), _jsx("td", { className: "px-5 py-5 border-b border-gray-200 bg-white text-sm", children: _jsxs("label", { className: "flex items-center cursor-pointer", children: [_jsxs("div", { className: "relative", children: [_jsx("input", { type: "checkbox", className: "sr-only", checked: post.published, onChange: () => handlePublishToggle(post.id, post.published) }), _jsx("div", { className: `block w-14 h-8 rounded-full ${post.published ? 'bg-green-500' : 'bg-gray-600'}` }), _jsx("div", { className: `dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${post.published ? 'transform translate-x-full' : ''}` })] }), _jsx("div", { className: "ml-3 text-gray-700 font-medium", children: post.published ? 'Published' : 'Draft' })] }) }), _jsx("td", { className: "px-5 py-5 border-b border-gray-200 bg-white text-sm", children: _jsxs("div", { 
                                                        // href={`${baseURL}/post/${post.id}`}
                                                        // to={`/post/${post.id}`}
                                                        className: "text-blue-600 hover:text-blue-900 mr-4 cursor-pointer", onClick: () => {
                                                            window.location.href = `${import.meta.env.VITE_PUBLIC_CLIENT_URL}/article/${post.id}`;
                                                        }, children: [_jsx(Eye, { className: "inline w-5 h-5" }), " View"] }) })] }, post.id))) })] }) }), _jsx("div", { className: "mt-6 flex justify-center", children: _jsx("nav", { children: _jsx("ul", { className: "flex", children: Array.from({ length: Math.ceil(sortedPosts.length / postsPerPage) }, (_, i) => (_jsx("li", { children: _jsx("button", { onClick: () => paginate(i + 1), className: `mx-1 px-3 py-2 rounded-md ${currentPage === i + 1
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`, children: i + 1 }) }, i))) }) }) })] }), _jsx(Footer, {})] }) }));
};
export default AllBlogsPage;
