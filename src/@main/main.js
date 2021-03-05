'use strict';

var askio = module.exports;
askio.prompts = {};

askio.Separator = require('./workers/seperators');

askio.ui = {
  BottomBar: require('./interface/bottom_bar'),
  Ask: require('./interface/prompt'),
};
askio.createPromptModule = function (opt) {
  var promptModule = function (questions, answers) {
    var ui;
    try {
      ui = new askio.ui.Prompt(promptModule.prompts, opt);
    } catch (error) {
      return Promise.reject(error);
    }
    var promise = ui.run(questions, answers);
    promise.ui = ui;

    return promise;
  };

  promptModule.prompts = {};

  /**
   * Register a prompt type
   * @param {String} name     Prompt type name
   * @param {Function} prompt Prompt constructor
   * @return {askio}
   */

  promptModule.addPlugin = function (name, prompt) {
    promptModule.prompts[name] = prompt;
    return this;
  };

  /**
   * Register the defaults provider prompts
   */

  promptModule.restoreDefaultPrompts = function () {
    this.addPlugin('list', require('./methods/list'));
    this.addPlugin('input', require('./methods/input'));
    this.addPlugin('number', require('./methods/number'));
    this.addPlugin('confirm', require('./methods/confirm'));
    this.addPlugin('rawlist', require('./methods/rawlist'));
    this.addPlugin('expand', require('./methods/expand'));
    this.addPlugin('secret', require('./methods/secret'));
  };

  promptModule.restoreDefaultPrompts();

  return promptModule;
};
askio.prompt = askio.createPromptModule();

// Expose helper functions on the top level for easiest usage by common users
askio.addPlugin = function (name, prompt) {
  askio.prompt.addPlugin(name, prompt);
};

askio.restoreDefaultPrompts = function () {
  askio.prompt.restoreDefaultPrompts();
};
