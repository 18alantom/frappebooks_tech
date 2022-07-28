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
        black: '#1E293B',
        gray: {
          25: '#fcfcfd',
          50: '#f8f9fc',
          100: '#f2f4f8',
          200: '#ebeff5',
          300: '#e2e8f0',
          400: '#cad5e2',
          500: '#9aa8bc',
          600: '#8493a9',
          700: '#64748b',
          800: '#475569',
          900: '#334155',
        },
        pink: {
          100: '#fdf7f8',
          200: '#fbeef1',
          300: '#f7dee5',
          400: '#eec3d2',
          500: '#df9eb8',
          600: '#cf82a7',
          700: '#ac688b',
          800: '#8f5b79',
          900: '#70485f',
        },
      },
    },
  },
  plugins: [],
};
