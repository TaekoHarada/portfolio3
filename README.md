# Portfolio Website

AWS クラウドサービスを活用した個人ポートフォリオサイト（Cloud Resume Challenge）

## 🏗️ アーキテクチャ

```
┌──────▼──────────┐
│  CloudFront     │ (CDN・HTTPS化)
└──────┬──────────┘
       │
┌──────▼──────────┐
│  S3 Bucket      │ (静的サイトホスティング)
│  (Next.js)      │
└─────────────────┘

       │ お問い合わせ
       ▼
┌─────────────────┐
│  API Gateway    │ (REST API)
└──────┬──────────┘
       │
┌──────▼──────────┐
│  Lambda         │ (Node.js)
└──────┬──────────┘
       │
┌──────▼──────────┐
│  SES            │ (メール送信)
└─────────────────┘

       │ 訪問者カウント
       ▼
┌─────────────────┐
│  DynamoDB       │ (訪問者数保存)
└─────────────────┘
```

## 🛠️ 技術スタック

### フロントエンド

- **Next.js 14** - React フレームワーク（静的エクスポート）
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング

### AWS インフラ

- **S3** - 静的サイトホスティング
- **CloudFront** - CDN・エッジ配信・HTTPS 化
- **Lambda** - サーバーレス関数（Node.js 20.x）
- **API Gateway** - REST API エンドポイント
- **SES** - メール送信サービス
- **DynamoDB** - 訪問者数カウンター
- **IAM** - アクセス制御

### CI/CD

- **GitHub Actions** - 自動デプロイパイプライン
- **AWS CLI** - デプロイ自動化

## 📋 前提条件

- Node.js 18.x 以上
- npm または yarn
- AWS アカウント
- AWS CLI 設定済み
- Git

## 🚀 ローカル開発

### 1. リポジトリのクローン

```bash
git clone https://github.com/TaekoHarada/portfolio3
cd portfolio3
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local` を作成:

```env
NEXT_PUBLIC_API_ENDPOINT_CONTACT=https://your-api-id.execute-api.ap-northeast-1.amazonaws.com/prod
NEXT_PUBLIC_API_ENDPOINT_VISITOR=https://your-api-id.execute-api.ap-northeast-1.amazonaws.com/prod
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開く

### 5. 本番ビルド

```bash
npm run build
```

静的ファイルが `out/` ディレクトリに生成されます。

## 📦 デプロイ手順

### Step 1: S3 バケットの作成

```bash
aws s3 mb s3://your-portfolio-bucket --region ap-northeast-1

aws s3 website s3://your-portfolio-bucket \
  --index-document index.html \
  --error-document 404.html
```

### Step 2: バケットポリシーの設定

```bash
aws s3api put-bucket-policy \
  --bucket your-portfolio-bucket \
  --policy file://bucket-policy.json
```

### Step 3: ファイルのアップロード

```bash
npm run build
aws s3 sync out/ s3://your-portfolio-bucket/ --delete
```

### Step 4: CloudFront ディストリビューションの作成

- マネジメントコンソールまたは AWS CLI で作成
- SSL 証明書（ACM）の設定
- カスタムドメインの設定

### Step 5: Lambda 関数のデプロイ

```bash
cd lambda/contact-handler
npm install
zip -r contact-handler.zip .

aws lambda create-function \
  --function-name contact-handler \
  --runtime nodejs22.x \
  --role arn:aws:iam::ACCOUNT_ID:role/lambda-contact-role \
  --handler index.handler \
  --zip-file fileb://contact-handler.zip
```

### Step 6: API Gateway の設定

- REST API の作成
- Lambda との統合
- CORS の有効化
- ステージのデプロイ

### Step 7: SES の設定

```bash
aws ses verify-email-identity \
  --email-address your-email@example.com \
  --region ap-northeast-1
```

## 🔄 CI/CD（GitHub Actions）

`.github/workflows/deploy.yml` が自動デプロイを実行します。

**トリガー:**

- `main` ブランチへのプッシュ

**実行内容:**

1. Next.js のビルド
2. S3 へのファイル同期
3. CloudFront キャッシュの無効化

**必要なシークレット:**

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`

## 📊 機能一覧

- ✅ レスポンシブデザイン
- ✅ お問い合わせフォーム（Lambda + SES）
- ✅ 訪問者カウンター（Lambda + DynamoDB）
- ✅ HTTPS 対応（CloudFront + ACM）
- ✅ 独自ドメイン対応（Route 53）
- ✅ 自動デプロイ（GitHub Actions）

## 🔐 セキュリティ

- CloudFront で HTTPS 強制
- API Gateway で CORS 設定
- IAM ロールで最小権限の原則
- 環境変数で機密情報を管理
- S3 バケットのパブリックアクセス制御

## 💰 コスト試算

**月間想定コスト（低トラフィック）:**

- S3: ~$0.50
- CloudFront: ~$1.00
- Lambda: 無料枠内
- API Gateway: 無料枠内
- Route 53: ~$0.50
- SES: 無料枠内
- DynamoDB: 無料枠内

**合計: 約 $2-3/月**

## 📝 ライセンス

MIT License
