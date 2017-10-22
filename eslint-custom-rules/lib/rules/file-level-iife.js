// http://astexplorer.net/

/**
 * @file Rule to enforce wrapping the whole file with IIFE
 * @author narr
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  create: function (context) {
    var sourceCodeAstBody;
    var sourceCodeAstBodyLength;
    var reportTxt;
    var firstNode;
    var firstNodeExpression;

    sourceCodeAstBody = context.getSourceCode().ast.body;
    sourceCodeAstBodyLength = sourceCodeAstBody.length;
    if (sourceCodeAstBodyLength > 0) {
      reportTxt = 'Wrap the whole file with IIFE';
      firstNode = sourceCodeAstBody[0];

      if (sourceCodeAstBodyLength === 1) {
        if (firstNode.type === 'ExpressionStatement') {
          firstNodeExpression = firstNode.expression;
          if (firstNodeExpression.type !== 'CallExpression' ||
            firstNodeExpression.callee.type !== 'FunctionExpression') {
            context.report(firstNode, reportTxt);
          }
        } else {
          context.report(firstNode, reportTxt);
        }
      } else {
        context.report(firstNode, reportTxt);
      }
    }

    return {};
  }
};
