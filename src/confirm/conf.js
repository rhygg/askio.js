const {Beautify, Color} = require('callista')
const { createPrompt, useState, useKeypress } = require('../core/hook');
const { isEnterKey } = require('../core/utils/key');
const { usePrefix } = require('../core/utils/prefix');

module.exports = createPrompt((config, done) => {
  const [status, setStatus] = useState('pending');
  const [value, setValue] = useState('');
  const prefix = usePrefix();

  useKeypress((key, rl) => {
    if (isEnterKey(key)) {
      const answer = value ? /^y(es)?/i.test(value) : config.default !== false;
      setValue(answer ? 'yes' : 'no');
      setStatus('done');
      done(answer);
    } else {
      setValue(rl.line);
    }
  });

  let formattedValue = value;
  let defaultValue = '';
  if (status === 'done') {
    formattedValue = Color.cyan(value);
  } else {
    defaultValue = Color.dim(config.default === false ? ' (y/N)' : ' (Y/n)');
  }

  const message = Color.bold(config.message);
  return `${prefix} ${message}${defaultValue} ${formattedValue}`;
});
