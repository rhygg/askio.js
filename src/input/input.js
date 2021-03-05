const { createPrompt, useState, useKeypress } = require('../core/hook');
const { usePrefix } = require('../core/utils/prefix');
const { isEnterKey, isBackspaceKey } = require('../core/utils/key');
const {Color} = require('Callista')

module.exports = createPrompt((config, done) => {
  const [status, setStatus] = useState('pending');
  const [defaultValue, setDefaultValue] = useState(config.default);
  const [errorMsg, setError] = useState();
  const [value, setValue] = useState('');

  const isLoading = status === 'loading';
  const prefix = usePrefix(isLoading);

  useKeypress(async (key, rl) => {
    if (status !== 'pending') {
      return;
    }

    if (isEnterKey(key)) {
      const answer = value || defaultValue || '';
      setStatus('loading');
      const isValid = await config.validate(answer);
      if (isValid === true) {
        setValue(answer);
        setStatus('done');
        done(answer);
      } else {
        setValue('');
        setError(isValid || 'You must provide a valid value');
        setStatus('pending');
      }
    } else if (isBackspaceKey(key) && !value) {
      setDefaultValue(undefined);
    } else {
      setValue(rl.line);
      setError(undefined);
    }
  });

  const message = Color.bold(config.message);
  let formattedValue = value;
  if (typeof config.transformer === 'function') {
    formattedValue = config.transformer(value, { isFinal: status === 'done' });
  }
  if (status === 'done') {
    formattedValue = Color.cyan(formattedValue);
  }

  let defaultStr = '';
  if (defaultValue && status !== 'done' && !value) {
    defaultStr = Color.dim(` (${defaultValue})`);
  }

  let error = '';
  if (errorMsg) {
    error = Color.red(`> ${errorMsg}`);
  }

  return [`${prefix} ${message}${defaultStr} ${formattedValue}`, error];
});
