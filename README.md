
# Mini Blog Platform

A simple blog platform built with CRUD operations for posts and comments. This platform includes user authentication, responsive design.


## Tech Stack

### Frontend

- React (with Vite)
- TypeScript
- TanStack Query (React Query) for data fetching and caching
- Tailwind CSS for styling
- React Router for navigation
- Zod for form validation

### Backend

- Node.js
- Express.js
- Supabase (PostgreSQL) - Used for database management and authentication

## Features

### User Authentication

- User login and registration with Supabase Auth.
- Conditional rendering and access based on authentication.

### Blog Posts

- CRUD Operations for posts (Create, Read, Update, Delete).
- Pagination on the list view.
- Single Post View to see details and comments.

### Comments

- CRUD Operations for comments.
- Display comments under each post.
- Users can edit or delete their own comments.

### Responsive Design

- Responsive and mobile-friendly layouts.

### Form Validation

- Zod for validating form inputs in the frontend.

### Dark Mode

- Dark and light themes with a toggle switch.

## Requirements

### Frontend

- React with Vite for project setup.
- TypeScript for type safety.
- TanStack Query for data fetching and caching.
- Responsive design with Tailwind CSS.
- Form validation using Zod.

### Backend

- Node.js with Express.js server.
- Supabase (PostgreSQL) for database management.
- RESTful API endpoints for posts and comments.
- Zod for request validation on backend.


## Usage

1. **Login/Register:** Visit `/auth` to log in or register.
2. **Create a Post:** Once logged in, click “Create New Post” on the homepage.
3. **Edit/Delete Post:** On each post, there’s an option to edit or delete the post.
4. **Comment:** On a post’s details page, add comments. You can edit or delete your own comments.

## API Endpoints

| Method | Endpoint                          | Description                  |
|--------|-----------------------------------|------------------------------|
| POST   | /api/posts                        | Create a new post            |
| GET    | /api/posts                        | Fetch all posts              |
| GET    | /api/posts/:id                    | Fetch a single post          |
| PUT    | /api/posts/:id                    | Update a post                |
| DELETE | /api/posts/:id                    | Delete a post                |
| POST   | /api/posts/:id/comments           | Create a comment for a post  |
| GET    | /api/posts/:id/comments           | Fetch comments for a post    |
| PUT    | /api/posts/:id/comments/:id       | Update a comment             |
| DELETE | /api/posts/:id/comments/:id       | Delete a comment             |

## Notes



