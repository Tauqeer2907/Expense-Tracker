/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Suggestion from requirements
                primary: {
                    DEFAULT: '#6366f1', // Indigo 500
                    dark: '#4f46e5', // Indigo 600
                    light: '#818cf8', // Indigo 400
                },
                secondary: '#10b981', // Emerald 500
                danger: '#ef4444', // Red 500
                dark: '#0f172a', // Slate 900
                light: '#f8fafc', // Slate 50
            }
        },
    },
    plugins: [],
}
