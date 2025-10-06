# 🎬 Movie App

A modern, responsive movie discovery application built with React, TypeScript, and Tailwind CSS. Search for movies, discover trending content, and enjoy infinite scrolling through The Movie Database (TMDB) API.

![Movie App](public/hero-img.png)

## ✨ Features

- 🔍 **Smart Search**: Real-time movie search with debounced input
- 📈 **Trending Movies**: Display of most searched movies from your database
- ♾️ **Infinite Scroll**: Seamless pagination for browsing movies
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- ⚡ **Fast Performance**: Optimized with React Query for efficient data fetching
- 🎨 **Modern UI**: Clean, gradient-based design with smooth animations
- 📊 **Analytics**: Track search patterns using Appwrite database

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Backend**: Appwrite (Database & Analytics)
- **API**: The Movie Database (TMDB) API
- **Build Tool**: Vite with Rolldown
- **Code Quality**: ESLint, Prettier, Husky
- **Package Manager**: Bun

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- TMDB API key
- Appwrite project setup

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movie-app
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_PROJECT_NAME=your_appwrite_project_name
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_TABLE_ID=your_appwrite_table_id
   ```

4. **Set up Appwrite Database**

   Create a table in your Appwrite database with the following structure:
   - `searchTerm` (String)
   - `count` (Integer)
   - `movie_id` (Integer)
   - `poster_url` (String)

5. **Start the development server**

   ```bash
   bun dev
   ```

6. **Open your browser**

   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── movie-card.tsx   # Movie card component
│   ├── search.tsx      # Search input component
│   └── spinner.tsx      # Loading spinner
├── constants/          # API constants
│   └── tmdb.ts         # TMDB API configuration
├── hooks/              # Custom React hooks
│   ├── use-debounce.ts # Debounce hook for search
│   └── use-infinite-scroll.ts # Infinite scroll hook
├── lib/                # Utility libraries
│   ├── appwrite.ts     # Appwrite database operations
│   ├── tmdb.ts         # TMDB API functions
│   └── utils.ts        # General utilities
├── types.ts            # TypeScript type definitions
├── env.ts              # Environment validation
├── app.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🔧 Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun preview` - Preview production build
- `bun lint` - Run ESLint
- `bun format` - Format code with Prettier
- `bun check-types` - Run TypeScript type checking

## 🎯 Key Features Explained

### Smart Search

- Debounced search input (500ms delay) to prevent excessive API calls
- Searches both movie titles and content
- Updates search analytics in real-time

### Trending Movies

- Displays top 5 most searched movies
- Data persisted in Appwrite database
- Updates automatically as users search

### Infinite Scroll

- Seamless pagination without page reloads
- Loads more movies as user scrolls
- Optimized performance with React Query caching

### Responsive Design

- Mobile-first approach
- Beautiful gradient backgrounds
- Smooth animations and transitions

## 🔌 API Integration

### TMDB API

- Movie search and discovery
- Poster images and metadata
- Rate limiting handled automatically

### Appwrite Database

- Search analytics tracking
- Trending movies calculation
- Real-time data synchronization

## 🎨 Styling

The app uses Tailwind CSS with custom configurations:

- Gradient text effects
- Responsive grid layouts
- Custom animations
- Dark/light theme support

## 🚀 Deployment

### Build for Production

```bash
bun build
```

### Deploy to Vercel/Netlify

1. Connect your repository
2. Set environment variables
3. Deploy automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the movie API
- [Appwrite](https://appwrite.io/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [TanStack Query](https://tanstack.com/query) for data fetching

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

Made with ❤️ and React
