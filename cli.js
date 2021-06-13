#!/usr/bin/env node
// 扫描当前文件的所有JSX 文件
// 将JSX 文件 转换成Taro 的文件
// 创建output 文件, 并且输出Taro 文件
const path = require('path')
const tran = require('./tran')
var fs = require("fs");
function listFile(dir,list=[]) {

  var arr = fs.readdirSync (dir);
  arr.forEach (function (item) {
    var fullpath = path.join (dir, item);
    var stats = fs.statSync (fullpath);
    if (stats.isDirectory ()) {
      listFile (fullpath,list);
    } else {
      list.push (fullpath);
    }
  });
  return list;

}
let FileList = listFile(path.resolve())
FileList = FileList.filter((item) => {
  return item.includes('jsx') && !item.includes('dist') && !item.includes('node_modules')
})

console.log (FileList)
FileList.forEach((item) => {
  fs.readFile(item, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    //console.log(data)
    console.log (data)
    let tranSource = tran(data)
    write(tranSource,item)

  })
})
function write(source,name){
  if (!fs.existsSync(path.resolve() + '/dist')) {
    fs.mkdirSync(path.resolve() + '/dist')
  }
  fs.writeFile(path.resolve() + '/dist/'+path.basename(name),source,(err,data) => {
    if (err) {
      console.log (err)
      return 0
    }
    console.log ('写入成功')
  })
  //console.log('Hello world!');
}

