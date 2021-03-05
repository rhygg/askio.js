'use-strict';



module.exports = ({
Secret: require('./secret/index'),
AutoComplete: require('./autocomplete/index'),
Survey: require('./survey/index'),
Select: require('./select/index'),
Input: require('./input/index'),
Confirm: require('./confirm/index'),
CheckBox: require('./check/index'),
askio: require('./@main/index'),
uiBottomBar: require('./@main/interface/bottom_bar'),
uiPrompt: require('./@main/interface/prompt'),
Ask: require('./@main/methods/main'),
Snippet: require('./snippet/index')

})
