# chat

## ビルド方法

- ローカル開発環境
  npx webpack --mode development --config webpack.dev.js

- 本番環境
  npx webpack --mode production --config webpack.prod.js

## WEB サーバー起動方法

npm start

- コマンド実行後に、web ブラウザのコンソール上に、どっちの環境用設定ファイルでビルドされたか出力されるので、確認する

console.log("env::develop");
or
console.log("env::production");
