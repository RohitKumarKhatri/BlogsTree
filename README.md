# BlogsTree

BlogsTree is a feature-rich blogging application built with Next.js, Tailwind CSS, and Prisma ORM. The application allows users to create, read, like, and comment on blogs, manage tags, and interact with a dynamic blogging community.

## Features

- **User Authentication**: Secure user authentication using NextAuth.js.
- **Rich Text Editor**: Create blogs using the Quill rich text editor (React-Quill).
- **Tag Management**: Add, autocomplete, and create tags dynamically.
- **Blog Operations**: Write, read, like, and comment on blogs.
- **User Interaction**: Follow other users and interact with their content.
- **Dark Mode**: Switch between light and dark themes using Tailwind CSS.
- **Responsive Design**: Optimized for various screen sizes.

## Tech Stack

- **Next.js**: React framework for building server-rendered applications.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Prisma ORM**: Type-safe database client for data management.
- **PostgreSQL**: Powerful, open-source relational database.
- **NextAuth.js**: Authentication for Next.js applications.
- **React-Quill**: Quill rich text editor for React.

## Database Schema

The database schema is designed using Prisma and includes models for users, blogs, comments, likes, tags, and more. Here is a brief overview of the schema:

- **User**: Represents a user in the system with fields for id, name, username, email, image, and relationships to blogs, comments, likes, accounts, sessions, read history, followers, and following.
- **Blog**: Represents a blog post with fields for id, title, body, likes count, comments count, read count, published status, timestamps, author, comments, likes, read history, and tags.
- **Comment**: Represents a comment on a blog post with fields for id, body, blog id, author id, timestamps, blog, and author.
- **Like**: Represents a like on a blog post with fields for id, blog id, user id, blog, and user.
- **Session**: Represents a session with fields for id, session token, user id, expiration, and user.
- **Account**: Represents a user account with fields for id, type, provider, provider account id, tokens, user id, and user.
- **ReadHistory**: Represents the read history of a blog with fields for id, blog id, user id, blog, and user.
- **Follows**: Represents the follow relationship between users with fields for id, follower id, following id, follower, and following.
- **Tag**: Represents a tag with fields for id, name, and blogs.
- **BlogTag**: Represents the many-to-many relationship between blogs and tags with fields for id, blog id, tag id, blog, and tag.

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/blogstree.git
   cd blogstree
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=your_database_url
   NEXTAUTH_URL=your_nextauth_url
   ```

4. **Run Migrations**:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or new features to add.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
