# Blog@MEDIUM

BLOG_APP_MEDIUM is a web application that allows users to create, manage, and share blog posts. It provides a platform similar to Medium, where users can express their thoughts and ideas through written content.

### [Click here to visit the app](https://blog-app-medium-tan.vercel.app/signup)

## Features

- **User Authentication**: Secure sign-up and login functionality for users.​
- **Create and Edit Posts**: Users can compose new blog posts and edit existing ones.​
- **View Posts**: Read blog posts created by other users.​
- **Responsive Design**: Optimized for various devices to provide a seamless user experience.

## Technologies Used

- **Frontend**: React.js
- **Backend**: hono.js (for Cloudflare deployment)
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)

## Deployment

- **Frontend**: [Vercel](https://vercel.com/)
- **Backend**: [Cloudflare](https://dash.cloudflare.com/)
- **Database**: [Aiven](https://aiven.io/)

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the Repository**:

```bash
git clone https://github.com/SajalDBansal/BLOG_APP_MEDIUM.git
```
2. **Navigate to the Project Directory**:

```bash
cd BLOG_APP_MEDIUM
```
3. **Install Dependencies**:
  - Backend:
```bash
cd backend
npm install
```
  - Frontend:
```bash
cd ../frontend
npm install
```
4. **Set Up Environment Variables**:

Create a .env file in the backend directory and add the following:
```bash
MONGO_URI=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
```
5. **Run the Application**:
  - Backend:
```bash
cd backend
npm run dev
```
  - Frontend:
```bash
cd ../frontend
npm run dev
```
The application will be running at http://localhost:5173.

### Features to be added
- **Search Functionality**: Allow users to search blogs by title, tags, or content.​
- **User Profiles**: Personal pages showing a user's posts and details.
- **Tags and Categories**: Organize posts based on tags or categories.​
- **Like/Bookmark System**: Users can like or bookmark posts for later.