module.exports = {
  theme: {},
  variants: {},
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
        },
      });
    },
    require('@tailwindcss/custom-forms'),
  ],
};
