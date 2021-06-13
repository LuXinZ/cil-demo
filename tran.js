// 解析器
const {parse} = require('@babel/parser');
// 转换器
const traverse = require('@babel/traverse').default;
// 类型识别
const t = require('@babel/types');
// 生成器
const generate = require('@babel/generator').default;

function tran(source){
  let newNode = t.jSXIdentifier('View')
// 解析语法
  const ast = parse(source, {
    sourceType: 'unambiguous',
    plugins:['jsx']
  });
  let myVisitor = ({types: t}) => {
    return {
      Identifier(path,state){
        //console.log (path)

      },
      FunctionDeclaration(path,state){
        //console.log (path)
      },
      JSXIdentifier(path,state){

        if (t.isJSXIdentifier(path.node,{name:'div'})) {
          path.replaceWith(newNode)
        }
      }
    }

  }
  traverse(ast, {
    enter(path) {
      console.log ()
      path.traverse(myVisitor({types:t}))
      //console.log (path.node.type)

      // in this example change all the variable `n` to `x`
    },

  });
  const {code } = generate(ast)
  return code
}
module.exports =  tran
