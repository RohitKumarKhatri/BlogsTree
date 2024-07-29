'use client';

import { commentOnBlog, fetchBlogById, likeBlog } from '@/actions/blogs';
import '@/assets/css/quill.css';
import Spinner from '@/components/Spinner';
import { Blog } from '@prisma/client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiFillEdit, AiFillLike } from 'react-icons/ai';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function BlogPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comment, setComment] = useState('');
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        const fetchedBlog = await fetchBlogById(id);
        setBlog(fetchedBlog);
      }
    };
    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    if (blog) {
      await likeBlog(blog.id);
      // Optionally update the blog state with new like count
    }
  };

  const handleComment = async () => {
    if (blog && comment) {
      await commentOnBlog(blog.id, comment);
      setComment('');
      // Optionally update the blog state with new comments
    }
  };

  const handleEdit = () => {
    if (blog) {
      router.push(`/edit/${blog.id}`);
    }
  };

  if (!blog) return <Spinner />;

  return (
    <div className="container mx-auto max-w-4xl p-5 space-y-4">
      <div className="flex flex-col">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
          {blog.title}
        </p>
        <div className="blog-body">
          <ReactQuill
            value={blog.body}
            readOnly
            theme="bubble"
            className="text-slate-900 dark:text-white"
          />
        </div>
        {/* <div className="flex flex-wrap gap-2 mt-4">
          {blog.tags.map((tag) => (
            <span
              key={tag.name}
              className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full">
              {tag.name}
            </span>
          ))}
        </div> */}
        <div className="flex items-center justify-center sm:justify-end mt-4 space-x-4">
          <button
            className="bg-blue-500 rounded-full px-5 py-2 text-white"
            onClick={handleLike}>
            <AiFillLike />
          </button>
          <button
            className="bg-gray-500 rounded-full px-5 py-2 text-white"
            onClick={handleEdit}>
            <AiFillEdit />
          </button>
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <button
            className="bg-green-500 rounded-full px-5 py-2 mt-2 text-white"
            onClick={handleComment}>
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}
