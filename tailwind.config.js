/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router (Next.js 13+)
    "./pages/**/*.{js,ts,jsx,tsx}", // Nếu có dùng Pages Router
    "./components/**/*.{js,ts,jsx,tsx}", // Nếu có thư mục components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
