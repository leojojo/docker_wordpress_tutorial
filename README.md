# WordPress Tutorial
0からローカルでWordPressテーマ開発する最小限未満の(時には正確さを欠いている)手順と説明。  
より正確なものはリンクを張っているので資料を読んでください。  

1. このWordPressサイト用のディレクトリを作成
```shell
mkdir my_wordpress
cd my_wordpress
curl http://gitignore.io/api/vim,macos,wordpress,visualstudiocode > .gitignore
```

2. Docker公式サイトにDocker Composeを使ったWordPress環境を作る`docker-compose.yml`があるのでそれを利用。  
https://docs.docker.com/compose/wordpress/
```shell
docker-compose up -d
```
これでコンテナが立ち上がって、ブラウザからWordPressが見られるはずなので確認する。  
Mac: `open http://localhost:8000`  
Linux: `xdg-open http://localhost:8000`  

3. 見られたらとりあえずGitHubに現状をあげる。  
https://help.github.com/ja/github/creating-cloning-and-archiving-repositories/creating-a-new-repository  
https://help.github.com/ja/github/importing-your-projects-to-github/adding-an-existing-project-to-github-using-the-command-line  
```shell
echo "# my_wordpress" > README.md
git init
git add .
git commit -m "initial commit"
git remote add origin ここにゆーあーるえる
git push -u origin master
```

4. コンテナに名前をつける。  
長ったらしい名前が付いているので、`docker-compose.yml`を開いて、それぞれのコンテナに`container_name`をつける。  
それぞれ`container_name: mysql` と `container_name: wordpress`にした。

5. データベースのダンプファイルを作成する。  
アカウント作成をして、Hello World記事が見られるところまで行くと、MySQLデータベースに中身が入っている。  
これごとGitHubにあげてしまいたい。
```shell
mkdir mysql
docker exec mysql /usr/bin/mysqldump -u wordpress -pwordpress wordpress > mysql/dump.sql
```
これでコンテナ内でダンプを取るコマンドが実行されて、SQLでデータベースの中身が出力されているので確認する。  
`cat mysql/dump.sql`
