# WordPress Tutorial
0からローカルでWordPressテーマ開発する最小限未満の(時には正確さを欠いている)手順と説明。  
より正確なものはリンクを張っているので資料を読んでください。  

## 1. このWordPressサイト用のディレクトリを作成
```shell
mkdir my_wordpress
cd my_wordpress
curl https://gitignore.io/api/vim,macos,wordpress,visualstudiocode > .gitignore
```

## 2. Docker公式サイトにDocker Composeを使ったWordPress環境を作る`docker-compose.yml`があるのでそれを利用。  
https://docs.docker.com/compose/wordpress/
```shell
docker-compose up -d
```
これでコンテナが立ち上がって、ブラウザからWordPressが見られるはずなので確認する。  
http://localhost:8000

## 3. 見られたらとりあえずGitHubに現状をあげる。  
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

## 4. コンテナに名前をつける。  
長ったらしい名前が付いているので、`docker-compose.yml`を開いて、それぞれのコンテナに`container_name`をつける。  
それぞれ`container_name: mysql` と `container_name: wordpress`にした。
### docker-compose.yml
```yaml
services:
   db:
     container_name: mysql
     image: mysql:5.7
     ...

   wordpress:
     container_name: wordpress
     depends_on:
       - db
     image: wordpress:latest
     ...
```

## 5. データベースのダンプファイルを作成する。  
アカウント作成をして、Hello World記事が見られるところまで行くと、MySQLデータベースに中身が入っている。  
これごとGitHubにあげてしまいたい。
```shell
mkdir mysql
docker exec mysql /usr/bin/mysqldump -u wordpress -pwordpress wordpress > mysql/dump.sql
```
これでコンテナ内でダンプを取るコマンドが実行されて、SQLでデータベースの中身が出力されているので確認する。  
`cat mysql/dump.sql`
最後にgitでデータベースを管理できない設定にしてしまったので、以下を削除してできるようにする。
```
*.sql
*.sqlite
```

## 6. コンテナ起動時にダンプファイルが読み込まれるようにする。  
MySQLのDocker公式イメージには便利な仕組みが用意されている。  
それを利用するため、以下を`docker-compose.yml`の`mysql`コンテナの`volume`に書き足す。  
### docker-compose.yml
```yaml
     volumes:
       - db_data:/var/lib/mysql
       - ./mysql:/docker-entrypoint-initdb.d
```
これでDBごとGitHubで共有できるようになったので、ローカルからボリュームを一回消して、また同じ画面に立ち上がるかを確認する。  
```shell
docker-compose down -v
docker-compose up -d
```
これを実行してまた先程と同じ画面が表示されたらOK。

## 7. WordPressのテーマが入った`themes`ディレクトリへの変更を永続化する。  
つまり、コンテナを消しても編集内容が消えず、GitHubにも上げられるようにする。 
`docker-compose.yml`の`wordpress`コンテナの`volume`に書き足す。  
### docker-compose.yml
```yaml
  image: wordpress:latest
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

## 8. いよいよ`themes`ディレクトリに自分のテーマ(my_themeと名付ける)を作っていく。  
使いたい親テーマがあるならそれもここに入れる。  
```shell
cd wordpress/themes
mkdir my_theme
cd my_theme
```
まずWordPressテーマとして必要最低限のものを用意する。  
### style.css
```css
  /*
  Theme Name: My Theme
  Author: Watashino Namae
  Version: 1.0
  */
```

### index.php
```php
<h1><?php echo get_bloginfo('name'); ?></h1>
```

これで管理画面から自分のテーマを選択できるようになったので確認する。  
http://localhost:8000/wp-admin/themes.php

## 9. 今のサイトをサーバーに上げて、自分のドメインで公開できるようにダンプファイルを書き換える。  
さくらのレンタルサーバーやら選択肢はあるが、今回はのGCPの無料枠で公開する。  
```shell
gcloud compute instances create wordpress-tutorial --zone=asia-northeast1-a --machine-type=f1-micro --image-family=ubuntu-minimal-1810 --image-project=ubuntu-os-cloud
gcloud compute instances list
gcloud compute firewall-rules create wp-default --allow tcp:8000 --source-tags=wordpress-tutorial --source-ranges=0.0.0.0/0 
gcloud compute ssh wordpress-tutorial --zone=asia-northeast1-a
```
```shell
git clone 自分のリポジトリのゆーあーるえる
cd 自分のリポジトリのでぃれくとり
```
今作ったGCPのインスタンス上でDocker Compose、gitあたりのインストールをする。  
ドメインレジストラではDNSの設定をして、このGCPインスタンスのEXTERNAL_IPへドメインを向ける。  

WordPressのデータベースの設定で`localhost:8000`が現在のサイトのURLおよびホームページとして設定されている。  
このサイトを公開して、用意したドメインで運用するとなるとこれを書き換える必要がある。  
いくつか方法はあるが、今回はシェルコマンドでダンプファイルにある`localhost:8000`を移行先ドメインに置き換える。  
```shell
sed -i 's/localhost:8000/移行先ドメインどっとこむ/g' mysql/dump.sql
docker-compose up -d
```

## 10. 開発していく
以降は、新機能なら`feature/新機能名`、修正なら`fix/修正対象`などと名付けたブランチを切って開発していくと良い。  
```shell
git branch feature/新機能名
git checkout feature/新機能名

開発をする

git add .
git commit -m "新機能概要"
git push -u origin feature/新機能名
```

変更をサーバーに上げたい時にはまず変更がGitHubに上がっているのを確認してから、サーバー上でpullして持ってくる。  
本番サーバーなら`master`ブランチを使って、開発サーバーなら任意のブランチや`develop`などと名付けた別のブランチを使うと良い。  
```shell
gcloud compute ssh wordpress-tutorial --zone=asia-northeast1-a
```
```shell
cd 自分のリポジトリのでぃれくとり
git fetch
git checkout feature/新機能名
docker-compose restart
```

### テーマ開発
- 全般
  - https://noumenon-th.net/programming/wordpress/
  - https://wpdocs.osdn.jp/%E3%83%86%E3%83%BC%E3%83%9E%E3%81%AE%E4%BD%9C%E6%88%90
- 任意の入力欄がほしい
  - https://haniwaman.com/advanced-custom-fields/
- SEO
  - https://ja.wordpress.org/plugins/all-in-one-seo-pack/

### デザインの諸々
- CSS全般
  - https://www.w3.org/Style/Examples/007/center.ja.html
  - https://www.mirucon.com/2016/06/24/flexbox-grid-design/
  - https://coliss.com/articles/build-websites/operation/css/css-grid-vs-flexbox-which-should-you-choose.html
- カルーセル
  - https://coliss.com/articles/build-websites/operation/javascript/jquery-plugin-slick.html
  - https://coliss.com/articles/build-websites/operation/javascript/es6-slider-carousel-glidejs.html
- SCSSを使いたい
  - https://qiita.com/super-mana-chan/items/42b207ad2e216ac6a638

### プラグインを管理する
[7. WordPressのテーマが入った`themes`ディレクトリへの変更を永続化する。](https://github.com/leojojo/wordpress_tutorial#7-wordpress%E3%81%AE%E3%83%86%E3%83%BC%E3%83%9E%E3%81%8C%E5%85%A5%E3%81%A3%E3%81%9Fthemes%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%81%B8%E3%81%AE%E5%A4%89%E6%9B%B4%E3%82%92%E6%B0%B8%E7%B6%9A%E5%8C%96%E3%81%99%E3%82%8B)
これを参考に`theme`と一緒に`plugin`も作る。  

### 〇〇が足りない
- 画像アップロード上限: https://tech.recruit-mp.co.jp/infrastructure/post-13086/#h-1 「ファイルアップロードサイズの上限値を設定する」
- 日本語: https://tech.recruit-mp.co.jp/infrastructure/post-13086/#h-2
- はやさ: https://kusanagi.tokyo/cloud/kusanagi-runs-on-docker/

### 〇〇が欲しい
- HTTPS: https://github.com/hoto17296/docker-certfront
- phpmyadmin: https://github.com/phpmyadmin/docker/blob/master/docker-compose.yml
それぞれ`docker-compose.yml`に追加する。
