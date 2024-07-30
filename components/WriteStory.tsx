'use client';

import { BlogWithTags, saveWithTags } from '@/actions/blogs';
import { ReactSelectOptions } from '@/types/ReactSelect';
import { fetchTagIncludesStringAndIgnoreCase } from '@/actions/tags';
import '@/assets/css/quill.css';
import { AppSession } from '@/types/Session';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function WriteStory() {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState<ReactSelectOptions[]>([]);
  const router = useRouter();

  const { data: session } = useSession() as AppSession;

  const modules = {
    toolbar: [
      [{ header: 1 }],
      [{ header: 2 }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const saveBlog = async (isPublished: boolean) => {
    const userId = session?.user?.id;
    const blog: BlogWithTags = {
      title,
      body: value,
      authorId: userId!,
      likesCount: 0,
      commentsCount: 0,
      published: isPublished,
      readCount: 0,
      updatedAt: new Date(),
      createdAt: new Date(),
      tags: selectedTags.map((tag) => {
        return {
          name: tag.label,
        };
      }),
    };
    const persistedPost = await saveWithTags(blog);
    console.log(persistedPost);
    router.push(`/blog/${persistedPost.id}`);
  };

  const filterColors = async (
    inputValue: string
  ): Promise<ReactSelectOptions[]> => {
    const tags = await fetchTagIncludesStringAndIgnoreCase(inputValue);
    console.log(tags);

    return tags.map((tag) => ({
      value: tag.name,
      label: tag.name,
      color: '', // Add the required 'color' property here
    }));
  };

  const promiseOptions = async (inputValue: string) =>
    new Promise<ReactSelectOptions[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

  return (
    <div className="container mx-auto max-w-6xl p-5 space-y-4">
      <div className="flex flex-col">
        <textarea
          placeholder="Add a Title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-transparent text-center max-h-96 outline-none "
        />
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          className="overflow-auto text-slate-900 dark:text-white bg-transparent mx-auto w-full"
          placeholder="Write your blog here..."
        />
        <AsyncCreatableSelect
          isMulti
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="Add tags here..."
          className="write-blogs-react-select-container"
          classNamePrefix="write-blogs-react-select"
          onChange={(selectedOptions) => {
            setSelectedTags(selectedOptions);
          }}
        />
        <div className="flex items-center justify-center sm:justify-end m-4 dark:text-black flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 font-medium ">
          <button
            className="bg-gray-100 dark:bg-gray-400 hover:bg-gray-200 rounded-full px-2 w-44 md:px-5 py-2 text-nowrap "
            onClick={() => saveBlog(false)}>
            Draft
          </button>
          <button
            className="bg-green-500 hover:bg-green-400 rounded-full px-2 w-44 md:px-5 py-2 text-nowrap"
            onClick={() => saveBlog(true)}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
