// http://astexplorer.net/

/**
 * @file Rule to disallow Inline Array Annotation in AngularJs
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
        var calleeObjectCallee;
        var calleeProp;
        var dItargetArr;
        var secondArg;

        callee = node.callee;
        calleeObject = callee.object;
        if (calleeObject && calleeObject.type === 'CallExpression') {
          calleeObjectCallee = calleeObject.callee;
          calleeProp = callee.property;
          dItargetArr = [
            'controller',
            'directive',
            'factory',
            'service',
            'provider',
            'constant',
            'value',
            'config',
            'run'
          ];
          secondArg = node.arguments[1];

          if (calleeObjectCallee.type === 'MemberExpression' &&
            calleeObjectCallee.object.name === 'angular' &&
            calleeObjectCallee.property.name === 'module' &&
            calleeProp && dItargetArr.indexOf(calleeProp.name) > -1 &&
            secondArg && secondArg.type === 'ArrayExpression') {
            context.report(node,
              'Don\'t use Inline Array Annotation. ' +
              'Instead, use $inject Property Annotation.\n' +
              'https://docs.angularjs.org/guide/di#-inject-property-annotation');
          }
        }
      }
    };
  }
};
