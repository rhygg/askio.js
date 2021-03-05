
![https://github.com/rhydderchc/askio](https://cdn.discordapp.com/attachments/790866153316679680/817288283176042506/20210305-1218481-unscreen.gif)

# Askio
askio contains highly configurable and powerful command line interface tools.
With the use of **askio** creating interactive command-line tools becomes an ease. We've integrated beautiful UI's using the [Callista](https://npmjs.com/package/callista) package to integrate professional Cli's.
**askio** only philosophy is to help people maintain the professional attitude in the most easiest way.

# Documentation

## Libraries
Most of the **askio** library is based off of functions, although yes we have two modules that use classes because of their complex structural root.

### Secret
The secret function is pretty useful when it comes to password prompting and full security of its getting leaked. A example with the `secret` function would be:
```js
let askio = require('askio');
let secret = askio.Secret;//Note: no braces
(async () => {
const value = await secret({
  message: "Enter your password.",
})

/*
This is a non-masked password i.e, no masks will be shown as well as the password being invisible.
*/
console.log("You sent", value)
/*
With a mask
*/
const answer = await secret({
  message: "Enter your password.",
  mask: '.'
})
console.log('You sent',`${answer}`)
})();
```
**Options**
`name`,`message`,`maskWith`

## Check
This module prompts for multiple option questions which can be moved about using the keyboard arrows, selected using the **spacebar**, all of them selected(or toggle all) with the **a** key and inverted using the **i**.
*Note: Not only can you use the keyboard arrows but also the __w__ and __s__ keys instead of up arrow and down arrow respectively*
An example of this module in use would be:
```js
const {Check} = require('askio');
(async () => {
const choice = await Check({
  message:'What do you prefer?',
  choices:[
    { name: "Apple",
    value: "apple"
  },
  {
    name:"Orange",
    value:"orange"
  } // this can go on!
  /*
  , {
  name: "Kiwi",
  value:"kiwi",
  disabled: true
}
this disables a package to be selected although shown!
  */
  ]
});
})();
```
**options**
`name`,`message`,`choices` *extend* => [{name, value, disabled(optional, checked(optional))}]
The checked option checks a choice by default which can not be overwritten.

### Survey (Class)
Survey is a very intutive and interesting module which looks beautiful as well as breath-taking, with the help of **askio** survey creatings become a piece of cake.

An example of creating a survey with *askio* would be:

```js
const { Survey } = require('askio');

const form = new Survey({
  name: 'Movie Review',
  message: 'How\'d you like the movie?',
   scale: [
    { name: '1', message: 'Coolish' },
    { name: '2', message: 'Dumbish' }
  ],
  margin: [0, 0, 2, 1],
  choices: [
    {
      name:"Its theme",
      value: "Its theme was okay, or bad?"
    },
    {
      name:"Its fantasy?",
      value:"did you like its fantasizing background?"
    }
  ]
});

form.go()
  .then(value => console.log('ANSWERS:', value))
  .catch(console.error);

```
**options**
`name`, `message`, `scale`, `margin`, `choices` *extends* => [{name, value}]

### Autocompelete (Class)
**askio** provides an autocomplete module, which trys to understand an answer based upon user values.

An example would be:
```js
const { AutoComplete } = require('askio');

const autocomp = new AutoComplete({
  name: 'color',
  message: 'Pick your favourite color',
  limit: 10,
  initial: 2,
  choices: [
    'Red',
    'Green',
    'blue',
    'orange',
    'magenta'
  ]
});

autocomp.go()
  .then(answer =>
    console.log('Fetched', answer))
  .catch(console.error);
```
**options**
`name`, `message`, `limit`, `initial`, `choices`, `multiple`

`initial` specifies the number of already selected options

`multiple`(`default:` `boolean`) specifies if there should be multiple choices.

### Input
Takes an input from the user

Example:
```js
const {Input} = require('askio');
(async() => {
const answer = await Input({
  message: "enter yer name"
})
console.log(answer+"  was your name")
})();

```
**options**

`message`, `default`, `validate`

`default` sets a default answer if no answer was provided.
`validate` validates the answer. *Returns a promise*
### Select
Select out of a lot of options!
Example:
```js
const select = require('askio');

(async () => {

const answer = await select({
    message: 'Select your favorite letter',
    choices: [
      {value: "Dog", description: "An animal"},
      {value: "Stuff toy", description: "Non-living"}
    ],
  });
  console.log('Answer:', answer);
})();

```
**options**
`message`, `choices` *extends* => [{value, description}]

### expand
Expand to show the definitions of the options.

Example:
```js
const {Expand} = require('askio');
const {Logger} = require("callista");
(async () => {
const answer = await Expand({
  message: 'Are you 18?',
  default: 'n',
  choices: [
    {
      key:'n',
      id: "No",
      value:"No you aren't"
    },
    {
      key:'y',
      id:"Yes",
      value:"Yes you are"
    }
  ]
});
Logger.write(`You said ${answer}`)
})();
```
### Snippet
Create placeholders for completing task, with an awesome percentage marker!

```js

const { Snippet } = require('askio');
const question = new Snippet({
  name: 'username',
  message: 'Fill out the fields in package.json',
  required: true,
  fields:[
    {
      name:"Age",
      value:"Enter your age"
    },
    {
      name:"Name",
      value:"Enter your name"
      /*
      , validate() {  <- This is optional

    }
      */
    }
  ],
  template: `{
    "name":"\${name}",
    "age":"\${age}"

  }`
});

question.go()
  .then(answer => console.log('You said', answer.result))
  .catch(console.error);
```
**options**
`name`,`message`, `fields` *extends* -> [{name, value, validate(optional)}], `template`
``template`` -> Specifies the template in which the prompt should go on!
# User Interface
Although each library in this module already consists of incredible UI's as default we've also added user interface *classes* just for you!

### uiBottomBar
Using the UI BottomBar is extremely easy, here's an example:

```js
var {uiBottomBar} = require('askio');
var bar = new  uiBottomBar;

bar.updateBottomBar('Lol');
// or as a simple logger
bar.log('haha')


```
This just provides a footer, at the bottom, like a text zone.

# Simple Prompts
Well as the main motive of the **askio** library is to let developers *ask* questions from the user via cli, we must provide a simple prompt library to provide flow.

You can ask questions using the `Ask` class.
``new askio.Ask(question, answer)``
