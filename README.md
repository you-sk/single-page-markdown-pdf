# single-page-markdown-pdf

シンプルなクライアントサイドのWebアプリケーションです。入力されたMarkdownテキストを、コンテンツの量に応じて自動で縮小し、必ず1ページに収まるPDFとして出力します。

すべての処理はブラウザ内で完結するため、入力したデータが外部サーバーに送信されることはありません。プライバシーを保ちながら手軽に利用できます。

**[デモページはこちら](https://you-sk.github.io/single-page-markdown-pdf/)**

![image](https://github.com/user-attachments/assets/59903d1c-442d-47d6-849b-61256e19af81)

## ✨ 特徴

- **ダイレクト入力 & ファイルアップロード**: テキストエリアに直接Markdownを書き込むか、.md/.txtファイルをアップロードして利用できます。
- **1ページPDF出力保証**: コンテンツの量にかかわらず、全体を縮小して必ず1ページのPDFとして出力します。
- **完全クライアントサイド**: すべての変換処理はあなたのブラウザ内で行われます。データは外部に送信されず、安全です。
- **日本語対応**: Noto Sans JPフォントをWebフォントとして利用し、日本語の文字化けを防ぎます。
- **軽量・シンプル**: プレビュー機能などを省き、PDF変換機能に特化した軽量なツールです。

## 使い方

### 1. Webページで利用する

1.  [デモページ](https://you-sk.github.io/single-page-markdown-pdf/) にアクセスします。
2.  テキストエリアにMarkdownを入力するか、「ファイルを選択」ボタンからファイルをアップロードします。
3.  「PDF作成」ボタンをクリックします。
4.  PDFの生成が完了すると、自動的にダウンロードが開始されます。

### 2. ローカル環境で利用する

1.  このリポジトリをクローンまたはダウンロードします。
2.  `index.html` をお使いのウェブブラウザ（Chrome, Firefoxなど）で開きます。
3.  Webページ版と同様に利用できます。
    ※ ライブラリをCDNから読み込んでいるため、ローカルでの利用時もインターネット接続が必要です。

## 📁 ファイル構成

```
single-page-markdown-pdf/
├── index.html    # メインのHTMLファイル
├── styles.css    # スタイルシート
├── script.js     # JavaScriptコード
├── README.md     # このファイル
└── LICENSE       # ライセンスファイル
```

## 🛠️ 使用技術

-   HTML5
-   CSS3
-   JavaScript (ES6+)
-   **ライブラリ (CDN経由)**
    -   [marked.js](https://github.com/markedjs/marked): MarkdownからHTMLへの変換
    -   [html2canvas](https://github.com/niklasvh/html2canvas): HTML要素のCanvasへの描画
    -   [jsPDF](https://github.com/parallax/jsPDF): PDFの生成
-   **フォント**
    -   [Noto Sans JP](https://fonts.google.com/specimen/Noto+Sans+JP) (Google Fonts)

## 📜 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細については `LICENSE` ファイルをご覧ください。
