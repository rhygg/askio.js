const input = require('../input');
const {Color}= (require)('callista')

module.exports = (config, ...args) => {
  if (config.transformer) {
    throw new Error(
      'askio password prompt do not support custom transformer function. Use the input prompt instead.'
    );
  }

  return input(
    Object.assign({}, config, {
      default: undefined,
      transformer: (input, { isFinal }) => {
        if (config.maskWith) {
          return String(config.maskWith).repeat(input.length);
        }

        if (!isFinal) {
          return Color.dim('[input is masked]');
        }

        return '';
      },
    }),
    ...args
  );
};
