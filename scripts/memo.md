# メモ

## ID
- ``res.message.message.channelId`` : チャンネルID取得
    - "f58c72a4-14f0-423c-9259-dbb4a90ca35f" : #gps/times/Ras
    - "2a5616d5-5d69-4716-8377-1e1fb33278fe" : #gps/times/Ras/Bot
- ``res.message.message.userID`` : ユーザーID取得
    - "0fa5d740-0841-4b88-b7c8-34a68774c784" : @Ras
- ``fs.readFile``するときは``./scripts/hoge.js``のようにかく

## 正規表現
- . : 任意の一文字
- * : 直前の記号の0回以上の繰り返し

## GAS
- `const txt = LanguageApp.translate("ねこです。", "ja", "en");` で日本語から英語に翻訳
- `const txt = LanguageApp.translate("ねこです。", "", "en");` とするとsourceを自動判別

## やりたいこと
- 便利な機能の追加
- 過度なメッセージ同時投稿の防止