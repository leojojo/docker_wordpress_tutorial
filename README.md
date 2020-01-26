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

6. コンテナ起動時にダンプファイルが読み込まれるようにする。  
MySQLのDocker公式イメージには便利な仕組みが用意されている。  
それを利用するため、以下を`docker-compose.yml`の`mysql`コンテナの`volume`に書き足す。  
```yaml
    - ./mysql:/docker-entrypoint-initdb.d
```
これでDBごとGitHubで共有できるようになったので、ローカルからボリュームを一回消して、また同じ画面に立ち上がるかを確認する。  
```shell
docker-compose down -v
docker-compose up -d
```
これを実行してまた先程と同じ画面が表示されたらOK。

7. WordPressのテーマが入った`themes`ディレクトリへの変更を永続化する。  
つまり、コンテナを消しても編集内容が消えず、GitHubにも上げられるようにする。 
`docker-compose.yml`の`wordpress`コンテナの`volume`に書き足す。  
```yaml
  volumes:
    - ./wordpress/themes:/var/www/html/wp-content/themes/
```
デフォルトのテーマがすべてローカルにもできるので確認する。  
```shell
mkdir -p wordpress/themes
docker-compose down
docker-compose up -d
ls wordpress/themes
```
