# YMMP台本抽出ツール

ゆっくりムービーメーカー（YMMP）のプロジェクトファイルからキャラクターのセリフを抽出するWebアプリケーションです。

## 機能

- YMMPファイルのアップロード（ドラッグ＆ドロップ対応）
- 登場キャラクターの自動検出
- キャラクター名の置換設定
- カスタマイズ可能な出力フォーマット
- スクリプトのテキストファイルへのダウンロード
- クリップボードへのコピー

## 使い方

1. YMMPファイルをアップロードします
2. 検出されたキャラクター名を必要に応じて置換設定します
3. 出力フォーマットとタイムスタンプオプションを選択します
4. 「スクリプトを抽出」ボタンをクリックします
5. 抽出結果からテキストファイルをダウンロードするか、クリップボードにコピーします

## 開発環境

- Vite
- React
- TypeScript

## プロジェクトのセットアップ

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/ymmp-script-extractor.git
cd ymmp-script-extractor

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# GitHub Pagesにデプロイ
npm run deploy
```

## ライセンス

MIT