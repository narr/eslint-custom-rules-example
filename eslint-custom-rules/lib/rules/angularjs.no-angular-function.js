/**
 * @file Rule to disallow Angular functions - e.g. angular.forEach
 * @author narr
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  create: function (context) {
    return {
      CallExpression: function (node) {
        var callee;
        var calleeObject;
        var calleeProp;
        var ngFnArr;

        callee = node.callee;
        calleeObject = callee.object;
        if (calleeObject && calleeObject.name === 'angular') {
          calleeProp = callee.property;
          ngFnArr = [
            'bind',
            'copy',
            'equals',
            'extend',
            'forEach',
            'fromJson',
            'identity',
            'isArray',
            'isDate',
            'isDefined',
            'isElement',
            'isFunction',
            'isNumber',
            'isObject',
            'isString',
            'isUndefined',
            'lowercase',
            'merge',
            'noop',
            'toJson',
            'uppercase',
          ];

          if (calleeProp && ngFnArr.indexOf(calleeProp.name) > -1) {
            context.report(node,
              'Don\'t use angular.' + calleeProp.name + '. ' +
              'Instead, use plain JS function or Lodash function if possible');
          }
        }
      }
    };
  }
};
