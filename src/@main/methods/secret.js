'use strict';
/**
 * `password` type prompt
 */

var {Color} = require('callista')
var { map, takeUntil } = require('rxjs/operators');
var Base = require('./main');
var observe = require('../helpers/actions');

function maskTextWith(input, maskChar) {
  input = String(input);
  maskChar = typeof maskChar === 'string' ? maskChar : '.';
  if (input.length === 0) {
    return '';
  }

  return new Array(input.length + 1).join(maskChar);
}

class PasswordPrompt extends Base {
  /**
   * Start the Inquiry session
   * @param  {Function} cb      Callback when prompt is done
   * @return {this}
   */

  _run(cb) {
    this.done = cb;

    var events = observe(this.rl);

    // Once user confirm (enter key)
    var submit = events.line.pipe(map(this.filterInput.bind(this)));

    var validation = this.handleSubmitEvents(submit);
    validation.success.forEach(this.onEnd.bind(this));
    validation.error.forEach(this.onError.bind(this));

    events.keypress
      .pipe(takeUntil(validation.success))
      .forEach(this.onKeypress.bind(this));

    // Init
    this.render();

    return this;
  }

  /**
   * Render the prompt to screen
   * @return {PasswordPrompt} self
   */

  render(error) {
    var message = this.getQuestion();
    var bottomContent = '';

    if (this.status === 'answered') {
      message += this.opt.mask
        ? Color.cyan(mask(this.answer, this.opt.mask))
        : Color.italic.dim('[hidden]');
    } else if (this.opt.mask) {
      message += mask(this.rl.line || '', this.opt.mask);
    } else {
      message += Color.italic.dim('[input is hidden] ');
    }

    if (error) {
      bottomContent = '\n' + Color.red('>> ') + error;
    }

    this.screen.render(message, bottomContent);
  }

  /**
   * When user press `enter` key
   */

  filterInput(input) {
    if (!input) {
      return this.opt.default == null ? '' : this.opt.default;
    }

    return input;
  }

  onEnd(state) {
    this.status = 'answered';
    this.answer = state.value;

    // Re-render prompt
    this.render();

    this.screen.done();
    this.done(state.value);
  }

  onError(state) {
    this.render(state.isValid);
  }

  onKeypress() {
    // If user press a key, just clear the default value
    if (this.opt.default) {
      this.opt.default = undefined;
    }

    this.render();
  }
}

module.exports = PasswordPrompt;
