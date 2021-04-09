# BOT_kinano
traQ用Bot
コマンドは[/src/src/README.md](src/src/README.md)参照

## Development Environment
```bash
$ KINANO_WORK_ENV=develop
$ npm start
```

## architecture
ファイル構成
```
.
├── bin/ # 実行ディレクトリ
├── scripts/ # tscでコンパイルされたjsファイルがここに入る
├── src/
│  ├── command/
│  │  ├── channel.ts # joinとleave
│  │  ├── chat.ts # ChaPlusAPIで自動会話
│  │  ├── develop.ts # 開発環境用
│  │  ├── format.ts # 表整形
│  │  ├── memo.ts # メモ作成
│  │  ├── music.ts # プレイリスト作成
│  │  ├── post.ts # 定時投稿
│  │  ├── reaction.ts # src/word.tsの語彙に反応
│  │  ├── test.ts # 未完成のいろいろ
│  │  ├── translate.ts # GASで翻訳
│  │  └── trend.ts # Twiterからtrendを取得
│  ├── src/
│  │  ├── README.md
│  │  ├── traqapi.ts # joinとleaveのAPI
│  │  └── words.ts # 反応語彙を格納
│  ├── src/
│  │  ├── mofu.ts # もふもふを返す関数
│  │  └── random.ts # ランダム整数を返す関数が入ってる
│  └── main.ts # command以下を動かす
└── README.md
```