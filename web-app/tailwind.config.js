/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'menu-gradient': 'linear-gradient(180deg, #4E7DFF 0%, 4167D2 100%)',
                'landing-rectangle': 'url(/images/utils/landing-rectangle.svg)',
                'landing-grid-overlay': 'url(/images/utils/landing-grid-overlay.svg)',
                'service-grid-overlay': 'url(/images/utils/service-grid-overlay.svg)',
            },
            colors: {
                'primary-bg': '#101218',
                'secondary-blue': '#4E7DFF',
                'secondary-blue-dark': '#2958d9',
                'header-bg': '#101218',
                white: '#FFFFFF',
                'icon-color-dark': '#24292F',
                lavender: '#8C7AE6',
                'lavender-dark': '#7c69db',
                'sunglow-yellow': '#FBC531',
                'sunglow-yellow-dark': '#e3b127',
                'babyblue-blue': '#BDE0FE',
                'babyblue-blue-dark': '#9BD1FF',
                'princess-pink': '#FFC6D9',
                'princess-pink-dark': '#FFB3C9',
                'green-neutral': '#43AA8B',
                'green-neutral-dark': '#2B876B',
                'semi-white': '#D7D7D7',
            },
            fontFamily: {
                'dela-gothic-one': ['Dela Gothic One'],
                Inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
