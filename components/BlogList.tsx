'use client';

import { fetchBlogs } from '@/actions/blogs';
import { fetchTrendingTags } from '@/actions/tags';
import { Blog } from '@prisma/client';
import cheerio from 'cheerio';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiHighFive } from 'react-icons/gi';
import { LiaCommentSolid } from 'react-icons/lia';
import { titleCase } from 'title-case';
import Spinner from './Spinner';

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setBlogs([]);

    async function loadBlogs() {
      setLoading(true);
      const data = await fetchBlogs();
      const tagsData = await fetchTrendingTags();
      if (!ignore) {
        setBlogs(data.blogs);
        setTags(tagsData);
        setLoading(false);
      }

      return () => {
        ignore = true;
      };
    }

    loadBlogs();
  }, []);

  function getFirstImageLink(html: string) {
    const $ = cheerio.load(html);
    const firstImage = $('img').first();
    console.log(firstImage);
    return firstImage.attr('src');
  }

  function getFirstLongParagraph(html: string) {
    const $ = cheerio.load(html);
    const paragraphs = $('p');
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraphText = $(paragraphs[i]).text();
      if (paragraphText.length >= 200) {
        return paragraphText;
      }
    }
    return ''; // Return an empty string if no paragraph meets the condition
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Trending Blogs</h2>
        <div className="space-y-8 ">
          {blogs.length === 0 && <p> Start Creating blogs...</p>}
          {blogs.map((blog) => (
            <div className="m-4 bg-white rounded-lg shadow-md" key={blog.id}>
              <Link key={blog.id} href={`/blog/${blog.id}`} className="my-4">
                <div className="p-6 flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <Image
                      src={
                        getFirstImageLink(blog.body) ||
                        '/default-blog-image.jpg'
                      }
                      alt={blog.title}
                      width={300}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="md:w-2/3 md:pl-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{blog.title}</h3>
                      <p className="mt-2 text-gray-600">
                        {getFirstLongParagraph(blog.body).slice(0, 200)}...
                      </p>
                    </div>
                    <div className="flex items-center mt-10 justify-end">
                      <Image
                        src={blog.author.image || '/default-avatar.png'}
                        alt={blog.author.name}
                        width={40}
                        height={40}
                        priority={false}
                        className="rounded-full"
                      />
                      <div className="ml-2">
                        <p className="text-sm font-medium">
                          {blog.author.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center space-x-4">
                        <span className="flex items-center text-gray-500">
                          <GiHighFive title="Kudos" />
                          {blog.likesCount}
                        </span>
                        <span className="flex items-center text-gray-500">
                          <LiaCommentSolid title="Comments" />
                          {blog.commentsCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {loading && <Spinner />}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Trending Tags</h2>
        <div className=" flex flex-wrap space-x-4 text-xl font-medium justify-start">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="bg-gray-100 mt-4 p-2 rounded-lg shadow-md">
              <p className="text-base font-medium text-gray-700">
                {titleCase(tag.name)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
