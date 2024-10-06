import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header, Footer, CommentSection } from '@shared';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ImageLoader = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={1500}
    height={850}
    viewBox="0 0 1500 850"
    backgroundColor="#E0F2FE"
    foregroundColor="#1D4ED8"
    {...props}
  >
    <rect x="0" y="0" rx="24" ry="24" width="1500" height="850" />
  </ContentLoader>
);

const ArticlePage: React.FC = () => {
  const { id } = useParams(); // Get the post ID from the URL params
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Local loading state
  interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: { name: string };
    createdAt: string;
    image: string;
    comments: Comment[];
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}`) // Fetch post by ID
      .then(({ data }) => {
        setPost(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container flex-grow mx-auto px-4 py-8">
        <div className="image-container relative w-full h-0 pb-[56.25%] mb-6 overflow-hidden">
          {loading && <ImageLoader />}
          <img
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
              loading ? 'opacity-0' : 'opacity-100'
            }`}
            src={
              post.image === 'default-image.png'
                ? `https://picsum.photos/seed/${id}/1200/675`
                : post.image
            }
            alt={post.image}
            onLoad={() => setLoading(false)}
          />
        </div>
        <h1 className="text-4xl font-extrabold">{post.title}</h1>
        <p className="mt-2 text-gray-600 mb-4">
          Written by {post.author.name} on{' '}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        {/* <div className="text-lg">{post.content}</div> */}
        <div className="text-lg">
          {post.content.split('\n').map((paragraph, index) => (
            <p
              key={index}
              className="mb-4  max-w-screen-small sm:max-w-screen-2xl leading-relaxed text-justify"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              &#8617; Back
            </button>
          </Link>
        </div>
        <hr className="my-12 border-gray-300" />
        <CommentSection comments={post.comments} blogId={id} />
      </div>
      <Footer />
    </div>
  );
};

export default ArticlePage;
