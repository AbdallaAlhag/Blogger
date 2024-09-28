import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<{ posts: BlogPost[] }>('http://localhost:3000/api/posts')
      .then(({ data }) => {
        setPosts(data.posts);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>
            {/* <Link
              to={`/post/${post.id}`}
              className="block bg-blue-500 text-white text-center py-2 hover:bg-blue-600 transition duration-300"
            >
              Read More
            </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}
