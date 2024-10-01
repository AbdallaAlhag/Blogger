import { useState, useEffect } from 'react';
import { Header, Footer, PostCard } from '@shared';
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
        // Ensure 'author' is always an object with a 'name'
        const updatedPosts = data.map((post: BlogPost) => ({
          ...post,
        }));
        // console.log(data);
        setPosts(updatedPosts);
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container flex-grow mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">My Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: BlogPost) => (
            <div key={post.id}>
              <PostCard
                id={post.id}
                title={post.title}
                content={post.content}
                author={post.author.name}
                createdAt={post.createdAt}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
