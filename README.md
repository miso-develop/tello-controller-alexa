# Tello Conrtoller (Alexaスキル)

Alexaスキルからトイドローン「Tello」を音声操作する方法です。  
当リポジトリにはエンドポイントで実行するNode.jsプログラムおよびAlexaスキルの対話モデルJSONを含みます。  



## 必要なもの

* Tello  
* Alexa搭載デバイス (Amazon Echoシリーズ等)  
* PC (Raspberry Pi等でも可)  
* Tello接続用Wi-Fiポート (USB Wi-Fiコネクタ等)  



## PC環境

* git ver2以上
* Node.js ver8系
* npm ver5系
* PCにはグローバルネットワーク接続用とTelloへのWi-Fi接続用の2つのネットワークポートが必要です  



## セットアップ

### エンドポイントをPC上で実行

以下のコマンドを実行しエンドポイントをPC上で実行します。  

```
git clone https://github.com/miso-develop/tello-controller-alexa
cd tello-controller-alexa

npm install

node index.js
```

### ngrokのインストール・実行

別のターミナルを起動し、当リポジトリのディレクトリで以下のコマンドを実行します。

```
npm install -g ngrok

ngrok http 3000
```

以下のような結果が返ってきますので、httpsのURLをコピーします。

```
ngrok by @inconshreveable                                       (Ctrl+C to quit)

Session Status                online
Account                       Miso Tanaka (Plan: Free)
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://xxxxxxxx.ngrok.io -> localhost:3000
Forwarding                    https://xxxxxxxx.ngrok.io -> localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              26      0       0.00    0.00    5.05    9.54
```

### Alexaスキルの作成

alexa developer consoleにてスキルを作成します。  

1. 「スキルの作成」ボタン
1. 「スキル名」を入力（なんでもいいです）
1. 「デフォルトの言語」から「日本語(日本)」を選択
1. 「スキルを作成」ボタン

まっさらなスキル画面になったら以下のように操作します。  

1. 「JSONエディター」を選択
1. model.jsonをドラッグ&ドロップ
1. 「モデルを保存」ボタン
1. 「モデルをビルド」ボタン

最後に先ほどngrokの実行結果からコピーしたURLをエンドポイントに設定します。  

1. 「エンドポイント」を選択
1. 「HTTPS」を選択
1. 「デフォルトの地域」にコピーしたURLを入力
1. 下のボックスから「開発用のエンドポイントは、証明機関が発行したワイルとカード証明書をもつドメインのサブドメインです」を選択
1. 「エンドポイントを保存」ボタン

以上でセットアップは完了です。  



### PCのWi-Fi設定

PCにUSB等のWi-Fiコネクタを接続します。  
これによりPC自体のネットワークに加え、もうひとつネットワークが追加されます。  
片方をグローバルネットワークに、もう片方をTelloに接続します。  



## スキルの実行

この状態でAlexaスキルを実行すると、Telloを音声操作できます。  
