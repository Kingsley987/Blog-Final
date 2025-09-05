# Blog-Final

A modern, responsive blog application built with React, TypeScript, and Supabase.

## Features

- 📱 **Mobile-First Design**: Optimized for all screen sizes
- 🌙 **Dark/Light Mode**: Toggle between themes
- 🔐 **User Authentication**: Sign up, sign in, and secure user sessions
- ✍️ **Create & Edit Posts**: Rich text editing with real-time updates
- 🗑️ **Delete Posts**: Secure post deletion with confirmation
- 📊 **Real-time Updates**: Live updates when posts are created, edited, or deleted
- 🎨 **Modern UI**: Beautiful gradient designs and smooth animations

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Run the database migrations in the `supabase/migrations/` folder
4. Enable Row Level Security (RLS) on the posts table

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

## Troubleshooting

### "Unable to create new post" Error

If you're unable to create new posts, check the following:

1. **Environment Variables**: Ensure your `.env` file is properly configured with valid Supabase credentials
2. **Authentication**: Make sure you're signed in to the application
3. **Database Setup**: Verify that the database migrations have been run and RLS policies are in place
4. **Network Connection**: Check your internet connection and Supabase project status

### Mobile Issues

The application is fully responsive and optimized for mobile devices. If you experience issues:

1. Clear your browser cache
2. Ensure you're using a modern browser
3. Check that JavaScript is enabled

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/Kingsley987/Blog-Final)