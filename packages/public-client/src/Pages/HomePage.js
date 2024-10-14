import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Header, Footer, PostCard, MainPostCard, LoadingErrorHandler, NoPostFound, } from '@shared';
import axios from 'axios';
const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        axios
            .get(`${baseURL}/posts`)
            .then(({ data }) => {
            // Ensure 'author' is always an object with a 'name'
            const updatedPosts = data.map((post) => ({
                ...post,
            }));
            // console.log(data);
            setPosts(updatedPosts);
            // console.log(updatedPosts);
            setIsLoading(false);
        })
            .catch((error) => {
            setError(error.message);
            setIsLoading(false);
        });
    }, [baseURL]);
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
    return (_jsx(LoadingErrorHandler, { isLoading: isLoading, error: error, children: _jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Header, {}), _jsxs("div", { className: "container flex-grow mx-auto px-4 py-8", children: [_jsx("div", { className: "grid grid-rows-2 grid-cols-3 gap-4 my-8", children: posts.length > 0 ? (posts.slice(6, 9).map((post, index) => (_jsx("div", { className: `${index === 0
                                    ? 'row-span-2 col-span-2'
                                    : 'row-span-1 col-span-1'}`, children: _jsx(MainPostCard, { id: post.id, title: post.title, content: post.content, author: post.author.name, createdAt: post.createdAt, image: post.image, isLarge: index === 0 }) }, post.id)))) : (_jsx(NoPostFound, {})) }), _jsx("h1", { className: "text-4xl font-bold mb-8 text-center", children: "My Blog" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.length > 0 ? (posts.slice(0, 6).map((post) => (_jsx("div", { children: _jsx(PostCard, { id: post.id, title: post.title, content: post.content, author: post.author.name, createdAt: post.createdAt, image: post.image, comments: post._count.comments }) }, post.id)))) : (_jsx(NoPostFound, {})) })] }), _jsx(Footer, {})] }) }));
};
export default HomePage;
