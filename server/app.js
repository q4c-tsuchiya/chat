/*  express + Node.js によるサーバサイドプログラム */

/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
var app = express();

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(3000, function() {
  console.log("Node.js is listening to PORT:" + server.address().port);
});

/* 3. 以後、アプリケーション固有の処理 */

// サンプルデータ
var userList = [
  {
    id: "001",
    name: "miyakawa",
    age: "30"
  },
  {
    id: "002",
    name: "tsuchiya",
    age: "28"
  }
];

// サンプルAPI
app.get("/api/users", function(req, res, next) {
  res.json(userList);
});
