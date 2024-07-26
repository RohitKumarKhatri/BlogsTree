'use client';

import { BlogData, save } from '@/actions/blogs';
import '@/assets/css/quill.css';
import { AppSession } from '@/types/Session';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import Select from 'react-select';

export default function MyComponent() {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
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
    const blog: BlogData = {
      title,
      body: value,
      authorId: userId!,
      likesCount: 0,
      commentsCount: 0,
      published: isPublished,
      readCount: 0,
      tags: [],
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    const persistedPost = await save(blog);
    console.log(persistedPost);
  };

  const handleTagChange = (selectedOptions: any) => {
    setSelectedTags(selectedOptions);
  };

  const handleCreateTag = async (inputValue: string) => {
    const newTag = await createTag(inputValue);
    setTags((prevTags) => [...prevTags, newTag]);
    return {
      label: newTag.name,
      value: newTag.id,
    };
  };

  return (
    <div className="container mx-auto max-w-4xl p-5 space-y-4">
      <div className="flex flex-col">
        <textarea
          placeholder="Add a Title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 text-4xl font-bold bg-transparent text-center mb-10 max-h-96"
        />
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          className="overflow-auto text-slate-900 dark:text-white"
          placeholder="Write your blog here..."
        />
        <Select
          isMulti
          options={tags.map((tag) => ({ label: tag.name, value: tag.id }))}
          onChange={handleTagChange}
          onCreateOption={handleCreateTag}
          placeholder="Add tags..."
          className="mb-4"
        />
        <div className="flex items-center justify-center sm:justify-end m-4 dark:text-black flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 ">
          <button
            className="bg-gray-300 rounded-full px-2 w-44 md:px-5 py-2 text-nowrap "
            onClick={() => saveBlog(false)}>
            Draft
          </button>
          <button
            className="bg-green-500 rounded-full px-2 w-44 md:px-5 py-2 text-nowrap"
            onClick={() => saveBlog(true)}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
