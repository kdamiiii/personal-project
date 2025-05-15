module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // These are where your pages and components are located
    "./components/**/*.{js,ts,jsx,tsx}", // Same for your components
    "./styles/**/*.{css}", // This ensures Tailwind is applied to any CSS file too
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
