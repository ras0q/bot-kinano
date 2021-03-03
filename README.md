# BOT_kinano
traQ用Bot
コマンドは[/scripts/src/README.md](https://git.trap.jp/Ras/KNKbot/src/branch/master/scripts/src/README.md)参照
## Development Environment
```bash
  $ export NODE_ENV=develop
  $ ./bin/hubot
```


## architecture
ファイル構成
```
.
├── bin/
├── scripts/
│  ├── command/
│  │  ├── channel.js # joinとleave
│  │  ├── chat.js # ChaPlusAPIで自動会話
│  │  ├── develop.js # 開発環境用
│  │  ├── format.js # 表整形
│  │  ├── memo.js # メモ作成
│  │  ├── music.js # プレイリスト作成
│  │  ├── post.js # 定時投稿
│  │  ├── reaction.js # src/word.jsの語彙に反応
│  │  ├── test.js # 未完成のいろいろ
│  │  ├── translate.js # GASで翻訳
│  │  └── trend.js # Twiterからtrendを取得
│  ├── modules/
│  │  └── random.js # ランダム整数を返す関数が入ってるだけ
│  ├── src/
│  │  ├── README.md
│  │  ├── traqapi.js # joinとleaveのAPI
│  │  └── words.js # 反応語彙を格納
│  └── main.js # command以下を動かす
└── README.md
```