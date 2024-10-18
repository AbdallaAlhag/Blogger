import { useState, useEffect } from 'react';
import {
  Header,
  Footer,
  PostCard,
  MainPostCard,
  LoadingErrorHandler,
  NoPostFound,
} from '@shared';

import axios from 'axios';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  console.log(baseURL);
  interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: { name: string };
    createdAt: string;
    image: string;
    _count: {
      comments: number;
    };
  }

  useEffect(() => {
    // if (!baseURL || isLoading) {  // Don't fetch if already loading
    //   return;
    // }
    if (!baseURL) {
      setError('Base URL is not defined');
      return;
    }

    console.log('Environment:', import.meta.env.MODE);
    console.log('Base URL:', baseURL);

    let isMounted = true; // Add this flag
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseURL}/posts`, {
          signal: controller.signal,
        });
        // Only update state if component is still mounted
        if (isMounted) {
          setPosts(response.data);
          setIsLoading(false);
        }
      } catch (error: unknown) {
        // Only handle error if it's not a cancellation
        console.log('Full error object:', error);
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
          return;
        }

        if (error instanceof Error) {
          console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name,
          });
        }

        if (axios.isAxiosError(error)) {
          console.error('Axios error details:', {
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
          });
        }

        if (isMounted) {
          setError((error as Error)?.message ?? '');
          setIsLoading(false);
        }
      }
    };

    fetchPosts();

    // Cleanup function
    return () => {
      isMounted = false; // Set flag to false when unmounting
      controller.abort(); // Cancel any pending requests
    };
  }, [baseURL]);
  return (
    <LoadingErrorHandler isLoading={isLoading} error={error}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container flex-grow mx-auto px-4 py-8">
          <div className="grid grid-rows-2 grid-cols-3 gap-4 my-8">
            {posts.length > 0 ? (
              posts.slice(6, 9).map((post: BlogPost, index: number) => (
                <div
                  key={post.id}
                  className={`${
                    index === 0
                      ? 'row-span-2 col-span-2'
                      : 'row-span-1 col-span-1'
                  }`}
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
              <NoPostFound />
            )}
          </div>
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
                    comments={post._count.comments}
                  />
                </div>
              ))
            ) : (
              <NoPostFound />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </LoadingErrorHandler>
  );
};

export default HomePage;
