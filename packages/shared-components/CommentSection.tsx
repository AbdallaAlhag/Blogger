import React, { useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';

interface Comment {
  username: string;
  content: string;
  createdAt: Date;
}

interface CommentSectionProps {
  comments: Comment[];
  blogId: string;
}

export function CommentSection({
  comments: initialComments,
  blogId,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments); // Set initial comments from props
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && username.trim()) {
      const { data: newCommentData } = await axios.post(
        `http://localhost:3000/posts/${blogId}/comments`,
        {
          username,
          content: newComment,
        }
      );

      // Update the comments list dynamically
      setComments([newCommentData, ...comments]);

      // Clear the input fields after submitting the comment
      setNewComment('');
      setUsername('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Add new comment form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-base font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="comment"
            className="block text-base font-medium text-gray-700"
          >
            Comment
          </label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 resize-none"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Post Comment
        </button>
      </form>
      <hr className="my-12 border-gray-300" />
      <h2 className="text-2xl font-bold">Comments</h2>
      {/* Display existing comments */}
      <div className="space-y-6 pb-10">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div
              key={index}
              className="bg-white shadow overflow-hidden sm:rounded-lg "
            >
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {comment.username}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {format(comment.createdAt, "MMMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <div className="sm:px-6 sm:py-5">
                  <p className="text-sm text-gray-500">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No comments, be the first!
          </p>
        )}
      </div>
    </div>
  );
}
