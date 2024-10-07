import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
export function CommentSection({ comments: initialComments, blogId, }) {
    const [comments, setComments] = useState(initialComments); // Set initial comments from props
    const [newComment, setNewComment] = useState('');
    const [username, setUsername] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() && username.trim()) {
            const { data: newCommentData } = await axios.post(`http://localhost:3000/posts/${blogId}/comments`, {
                username,
                content: newComment,
            });
            // Update the comments list dynamically
            setComments([newCommentData, ...comments]);
            // Clear the input fields after submitting the comment
            setNewComment('');
            setUsername('');
        }
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: "block text-base font-medium text-gray-700", children: "Username" }), _jsx("input", { type: "text", id: "username", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Your username", className: "mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "comment", className: "block text-base font-medium text-gray-700", children: "Comment" }), _jsx("textarea", { id: "comment", value: newComment, onChange: (e) => setNewComment(e.target.value), placeholder: "Add a comment...", className: "mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 resize-none", rows: 3, required: true })] }), _jsx("button", { type: "submit", className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Post Comment" })] }), _jsx("hr", { className: "my-12 border-gray-300" }), _jsx("h2", { className: "text-2xl font-bold", children: "Comments" }), _jsx("div", { className: "space-y-6 pb-10", children: comments.length > 0 ? (comments.map((comment, index) => (_jsxs("div", { className: "bg-white shadow overflow-hidden sm:rounded-lg ", children: [_jsxs("div", { className: "px-4 py-5 sm:px-6", children: [_jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: comment.username }), _jsx("p", { className: "mt-1 max-w-2xl text-sm text-gray-500", children: format(comment.createdAt, "MMMM d, yyyy 'at' h:mm a") })] }), _jsx("div", { className: "border-t border-gray-200 px-4 py-5 sm:p-0", children: _jsx("div", { className: "sm:px-6 sm:py-5", children: _jsx("p", { className: "text-sm text-gray-500", children: comment.content }) }) })] }, index)))) : (_jsx("p", { className: "text-center text-gray-500", children: "No comments, be the first!" })) })] }));
}
