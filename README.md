# 🎬 MovieFetcher

A sleek, modern movie discovery application built with **React**, **TypeScript**, and **Vite**. MovieFetcher allows you to search for your favorite films, view detailed information, rate them, and manage your personal watchlist.

## ✨ Features

- **🔍 Dynamic Search**: Real-time movie searching using the OMDb API.
- **📄 Detailed Insights**: Comprehensive movie details including plot, actors, ratings, and runtime.
- **⭐ Interactive Rating**: Custom star rating system to track your personal movie preferences.
- **📋 Watchlist Management**: Add and remove movies from your personal watchlist.
- **💾 Persistent Storage**: Saves your watchlist and ratings locally using `localStorage`.
- **🎨 Premium UI/UX**: Dark-themed, responsive design with smooth animations and a cinematic feel, powered by Tailwind CSS.

## 🚀 Tech Stack

- **Frontend**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API**: [OMDb API](http://www.omdbapi.com/)

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/manjul10/movieFetcher.git
   cd movieFetcher
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Get an OMDb API Key**:
   - Go to [OMDb API](http://www.omdbapi.com/apikey.aspx) and sign up for a free API key.
   - (Note: The current implementation has a hardcoded key for demonstration. For production, use environment variables).

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the app**:
   Navigate to `http://localhost:5173` in your browser.

## 📂 Project Structure

```text
src/
├── assets/          # Static assets
├── components/      # Reusable UI components (Sidebar, Header, etc.)
├── hooks/           # Custom React hooks
├── types.ts         # TypeScript interfaces and types
├── StarRating.tsx   # Custom star rating component
├── App.tsx          # Main application logic and layout
└── main.tsx         # Entry point
```

## 📝 Usage

- **Search**: Type any movie name in the top search bar. Use at least 3 characters to trigger the search.
- **Select**: Click on a movie card to view its full details.
- **Rate**: Use the star component to give your own rating to the movie.
- **Add to Watchlist**: Click "Add to Watchlist" to save the movie for later.
- **View Watchlist**: Check the right sidebar to see your saved movies and their summary statistics.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/manjul10/movieFetcher/issues).

---

Made with ❤️ by [Manjul](https://github.com/manjul10)
