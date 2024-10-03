import { useState, useEffect } from 'react';
// import { Header, Footer, PostCard } from '@shared';
import { Header } from '../../../shared-components/Header';
import Footer from '../../../shared-components/Footer';
import PostCard from '../../../shared-components/PostCard';
import MainPostCard from '../../../shared-components/MainPostCard';

import axios from 'axios';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: { name: string };
    createdAt: string;
    image: string;
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
        {/* turn this into a component like 'about blog' section */}
        <div className="grid grid-rows-2 grid-cols-3 gap-4 my-8">
          {posts.length > 0 ? (
            posts.slice(5, 8).map((post: BlogPost, index: number) => (
              <div
                key={post.id}
                className={`${
                  index === 0
                    ? 'row-span-2 col-span-2'
                    : 'row-span-1 col-span-1'
                }`} // First post spans 2 rows and 2 columns
              >
                <MainPostCard
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  author={post.author.name}
                  createdAt={post.createdAt}
                  image={post.image}
                  isLarge={index === 0}
                />
              </div>
            ))
          ) : (
            <div className="text-center">No posts available</div>
          )}
        </div>

        {/* <div className="bg-blue-500 p-4 rounded-lg row-span-2 col-span-2"></div> */}
        {/* <div className="bg-blue-500 p-4 rounded-lg"></div> */}
        {/* <div className="bg-blue-500 p-4 rounded-lg"></div> */}
        <h1 className="text-4xl font-bold mb-8 text-center">My Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.slice(0, 6).map((post: BlogPost) => (
              <div key={post.id}>
                <PostCard
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  author={post.author.name}
                  createdAt={post.createdAt}
                  image={post.image}
                />
              </div>
            ))
          ) : (
            <div className="text-center">No posts available</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
