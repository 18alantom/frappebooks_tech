module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      mono: 'Inconsolata, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    extend: {
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      },
      colors: {
        pink: {
          800: '#8F5B79',
          700: '#AC688B',
          600: '#CF82A7',
          500: '#DF9EB8',
          400: '#EEC3D2',
          300: '#F7DEE5',
          200: '#FBEEF1',
          100: '#FDF7F8',
        },
      },
    },
  },
  plugins: [],
};
