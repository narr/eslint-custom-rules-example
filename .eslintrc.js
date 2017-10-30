// To add a custom rule to a project ESLint config easily,
// need 'eslint-plugin-rulesdir' lib
// https://github.com/eslint/eslint/issues/8769
const rulesDirPlugin = require('eslint-plugin-rulesdir');
rulesDirPlugin.RULES_DIR = 'eslint-custom-rules/lib/rules';

module.exports = {
  "plugins": [
    "rulesdir"
  ],
  "rules": {
    "rulesdir/file-level-iife": 2,
    "rulesdir/angularjs.no-inline-array-annotation": 2,
    "rulesdir/angularjs.no-angular-function": 2
  }
};
