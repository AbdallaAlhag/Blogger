import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@shared';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  interface BlogPost {
    id: number;
    title: string;
    content: string;
    author: { name: string };
    createdAt: string;
  }
  useEffect(() => {
    axios
      .get('http://localhost:3000/posts')
      .then(({ data }) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

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
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">My Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: BlogPost) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.author.name}</span>
                  <span>{post.createdAt}</span>
                </div>
              </div>
              <Link
                to={`/post/${post.id}`}
                className="block bg-blue-500 text-white text-center py-2 hover:bg-blue-600 transition duration-300"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
