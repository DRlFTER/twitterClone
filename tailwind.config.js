/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        // Main Headings
        "first-title": "clamp(1.875rem, 1.5rem + 2vw, 3.25rem)", // 30px to 52px
        // Secondary Headings
        "second-title": "clamp(1.5rem, 1.25rem + 1vw, 2.5rem)", // 24px to 40px
        // Third Title
        "third-title": "clamp(1.125rem, 1rem + 0.5vw, 1.5rem)", // 18px to 24px
        // Description Texts
        description: "clamp(1rem, 0.875rem + 0.5vw, 1.25rem)", // 16px to 20px
        // Button Texts
        "button-text": "clamp(0.875rem, 0.75rem + 0.5vw, 1.125rem)", // 14px to 18px
      },
    },
  },
  plugins: [],
};
