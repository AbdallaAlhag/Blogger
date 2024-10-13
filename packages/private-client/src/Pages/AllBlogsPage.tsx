import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Footer, LoadingErrorHandler } from '@shared';
// import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, Eye } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  author: { name: string };
  createdAt: string;
  published: boolean;
  // comments: { id: string }[];
  _count: { comments: number };
}

type SortOption = 'date' | 'comments' | 'title';
type SortDirection = 'asc' | 'desc';

const AllBlogsPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
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
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts. Please try again later.');
      setIsLoading(false);
    }
  };

  const sortPosts = (
    posts: BlogPost[],
    sortBy: SortOption,
    direction: SortDirection
  ): BlogPost[] => {
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

  const handleSort = (newSortBy: SortOption) => {
    if (newSortBy === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDirection('desc');
    }
  };

  const handlePublishToggle = async (
    postId: string,
    currentStatus: boolean
  ) => {
    try {
      await axios.patch(`${baseURL}/posts/${postId}/unpublish`, {
        published: !currentStatus,
      });
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, published: !currentStatus } : post
        )
      );
    } catch (error) {
      console.error('Error updating post status:', error);
      setError('Failed to update post status. Please try again.');
    }
  };

  const sortedPosts = sortPosts(posts, sortBy, sortDirection);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const SortIcon = ({ column }: { column: SortOption }) => {
    if (sortBy !== column) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="inline w-4 h-4" />
    ) : (
      <ChevronDown className="inline w-4 h-4" />
    );
  };

  return (
    <LoadingErrorHandler isLoading={isLoading} error={error}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-3xl font-bold mb-6">Admin Blog Control</h1>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('title')}
                      className="flex items-center"
                    >
                      Title <SortIcon column="title" />
                    </button>
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('date')}
                      className="flex items-center"
                    >
                      Created At <SortIcon column="date" />
                    </button>
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('comments')}
                      className="flex items-center"
                    >
                      Comments <SortIcon column="comments" />
                    </button>
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {post.title}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {post.author.name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {post._count.comments}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={post.published}
                            onChange={() =>
                              handlePublishToggle(post.id, post.published)
                            }
                          />
                          <div
                            className={`block w-14 h-8 rounded-full ${post.published ? 'bg-green-500' : 'bg-gray-600'}`}
                          ></div>
                          <div
                            className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${
                              post.published ? 'transform translate-x-full' : ''
                            }`}
                          ></div>
                        </div>
                        <div className="ml-3 text-gray-700 font-medium">
                          {post.published ? 'Published' : 'Draft'}
                        </div>
                      </label>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div
                        // href={`${baseURL}/post/${post.id}`}
                        // to={`/post/${post.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer"
                        onClick={() => {
                          window.location.href = `${import.meta.env.VITE_PUBLIC_CLIENT_URL}/article/${post.id}`;
                        }}
                      >
                        <Eye className="inline w-5 h-5" /> View
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-center">
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
    </LoadingErrorHandler>
  );
};

export default AllBlogsPage;
