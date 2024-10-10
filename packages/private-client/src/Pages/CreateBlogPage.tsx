import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Footer, BlogPostEditor } from '@shared';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function CreateBlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(baseURL);

    if (!title || !content) {
      console.error('Title and content are required.');
      return;
    }

    // const token = localStorage.getItem('token');
    const token = Cookies.get('token');
    console.log(`Token: ${token}`);
    if (!token) {
      console.error('User not logged in');
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content.trim());


    if (image) {
      formData.append('image', image);
    }

    axios
      .post(`${baseURL}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('Created blog post:', res.data);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.error('Error creating blog post:', err);
        if (err.response && err.response.status === 401) {
          console.error('Authentication failed. Please log in again.');
          // localStorage.removeItem('token');
          Cookies.remove('token');
          navigate('/login');
        } else {
          console.error('Error creating blog post:', err);
        }
      });
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Create a New Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-bold text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-4"
            />
          </div>

          <BlogPostEditor
            initialContent={content}
            onContentChange={setContent}
          />

          <div>
            <label className="block text-sm font-bold text-gray-700">
              Image
            </label>
            <div
              {...getRootProps()}
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
                isDragActive ? 'border-indigo-500' : ''
              }`}
            >
              <div className="space-y-1 text-center">
                <input {...getInputProps()} />
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto h-32 w-32 object-cover"
                  />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex text-sm text-gray-600">
                  <p className="pl-1">
                    {isDragActive
                      ? 'Drop the image here'
                      : "Drag 'n' drop an image here, or click to select a file"}
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
