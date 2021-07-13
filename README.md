# BOT_kinano

traQ用Bot
コマンドは[/src/src/README.md](src/src/README.md)参照

## Development Environment

```bash
KINANO_WORK_ENV=develop
npm start
```

## Architecture

ファイル構成

```txt
.
├── bin/ # 実行ディレクトリ
├── scripts/ # tscでコンパイルされたjsファイルがここに入る
├── src/
│  ├── command/
│  │  ├── _startup/ts # デプロイ時に実行する関数
│  │  ├── channel.ts # joinとleave
│  │  ├── chat.ts # ChaPlusAPIで自動会話
│  │  ├── memo.ts # メモ作成
│  │  ├── music.ts # プレイリスト作成
│  │  ├── reaction.ts # src/word.tsの語彙に反応
│  │  ├── test.ts # 未完成のいろいろ
│  │  ├── translate.ts # GASで翻訳
│  ├── src/
│  │  ├── help.md # 機能一覧
│  │  ├── traqapi.ts # traQのAPI
│  │  ├── types.ts # hubot-traqのtypeを直打ち
│  │  └── words.ts # 反応語彙を格納
│  ├── src/
│  │  ├── mofu.ts # もふもふを返す関数
│  │  ├── music.ts # command/music.tsで使う関数
│  │  └── random.ts # ランダム整数を返す関数
│  └── main.ts # command以下を動かす
└── README.md
```
