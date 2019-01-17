module.exports = function owlUtils({ e, addUtilities, config }) {
  const newUtilities = {};
  const margins = config('margin', {});

  for (const key in margins) {
    const className = `.${e(`o-${key}`)} > * + *`;
    const marginTop = margins[key];

    if (marginTop == 'auto') {
      continue;
    }

    newUtilities[className] = { marginTop };
  }

  addUtilities(newUtilities);
};
