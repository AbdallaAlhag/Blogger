import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Footer, PostCard } from '@shared';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: { name: string };
  createdAt: string;
  image: string;
  comments: { id: string }[];
}

type SortOption = 'date' | 'comments' | 'title';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${baseURL}/posts-all`)
      .then(({ data }) => {
        const updatedPosts = data.map((post: BlogPost) => ({
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

  const sortPosts = (posts: BlogPost[], sortBy: SortOption): BlogPost[] => {
    switch (sortBy) {
      case 'date':
        return [...posts].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
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
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container flex-grow mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">All Blog Posts</h1>
        <div className="mb-8 flex justify-end items-center">
          <label htmlFor="sort" className="mr-2 text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Date</option>
            <option value="comments">Comments</option>
            <option value="title">Title</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.length > 0 ? (
            currentPosts.map((post: BlogPost) => (
              <div key={post.id}>
                <PostCard
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  author={post.author.name}
                  createdAt={post.createdAt}
                  image={post.image}
                  comments={post.comments.length}
                />
                {/* <p className="mt-2 text-sm text-gray-600">
                  Comments: {post.comments.length}
                </p> */}
              </div>
            ))
          ) : (
            <div className="text-center col-span-3">No posts available</div>
          )}
        </div>
        <div className="mt-8 flex justify-center">
          <nav>
            <ul className="flex">
              {Array.from(
                { length: Math.ceil(sortedPosts.length / postsPerPage) },
                (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`mx-1 px-3 py-2 rounded-md ${
                        currentPage === i + 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
