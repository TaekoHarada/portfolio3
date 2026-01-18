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
- **AWS CDK** - Infrastructure as Code（TypeScript）

### CI/CD

- **GitHub Actions** - 自動デプロイパイプライン
- **AWS CLI** - デプロイ自動化

## 📋 前提条件

- Node.js 18.x 以上
- npm または yarn
- AWS アカウント
- AWS CLI 設定済み
- AWS CDK CLI (`npm install -g aws-cdk`)
- Git

## 🚀 ローカル開発

### 1. リポジトリのクローン

```bash
git clone https://github.com/TaekoHarada/portfolio3
cd portfolio3
```

### 2. 依存関係のインストール

#### フロントエンド

```bash
npm install
```

#### CDK（インフラ）

```bash
cd cdk
npm install
cd ..
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

### 🆕 CDKを使ったデプロイ（推奨）

AWS CDKを使用することで、インフラをコードで管理し、再現可能なデプロイが可能になります。

#### Step 1: AWS CDK CLI のインストール

```bash
npm install -g aws-cdk
```

#### Step 2: AWSアカウントのブートストラップ（初回のみ）

```bash
# アカウントIDを確認
aws sts get-caller-identity --query Account --output text

# ブートストラップ実行
cdk bootstrap aws://ACCOUNT-ID/ap-northeast-1
```

#### Step 3: CDKプロジェクトのビルド

```bash
cd cdk
npm run build
```

#### Step 4: デプロイ前の確認

```bash
# 差分を確認
cdk diff

# CloudFormationテンプレートを生成
cdk synth
```

#### Step 5: インフラのデプロイ

```bash
# DynamoDBテーブルをデプロイ
cdk deploy

# 確認メッセージで 'y' を入力
```

#### Step 6: 初期データの投入

```bash
# 訪問者カウンターの初期値を設定
aws dynamodb put-item \
  --table-name portfolio-visitor-count \
  --item '{"id": {"S": "total"}, "count": {"N": "0"}}' \
  --region ap-northeast-1
```

#### Step 7: フロントエンドのデプロイ

```bash
# プロジェクトルートに戻る
cd ..

# Next.jsをビルド
npm run build

# S3にアップロード
aws s3 sync out/ s3://your-portfolio-bucket/ --delete
```

### 従来の方法（AWS CLI）

<details>
<summary>AWS CLIを使った手動デプロイ手順（クリックして展開）</summary>

#### Step 1: S3 バケットの作成

```bash
aws s3 mb s3://your-portfolio-bucket --region ap-northeast-1
aws s3 website s3://your-portfolio-bucket \
  --index-document index.html \
  --error-document 404.html
```

#### Step 2: バケットポリシーの設定

```bash
aws s3api put-bucket-policy \
  --bucket your-portfolio-bucket \
  --policy file://bucket-policy.json
```

#### Step 3: ファイルのアップロード

```bash
npm run build
aws s3 sync out/ s3://your-portfolio-bucket/ --delete
```

#### Step 4: CloudFront ディストリビューションの作成

- マネジメントコンソールまたは AWS CLI で作成
- SSL 証明書（ACM）の設定
- カスタムドメインの設定

#### Step 5: DynamoDB テーブルの作成

```bash
aws dynamodb create-table \
  --table-name portfolio-visitor-count \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
  --key-schema \
    AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region ap-northeast-1

# 初期値を設定
aws dynamodb put-item \
  --table-name portfolio-visitor-count \
  --item '{"id": {"S": "total"}, "count": {"N": "0"}}' \
  --region ap-northeast-1
```

#### Step 6: Lambda 関数のデプロイ

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

#### Step 7: API Gateway の設定

- REST API の作成
- Lambda との統合
- CORS の有効化
- ステージのデプロイ

#### Step 8: SES の設定

```bash
aws ses verify-email-identity \
  --email-address your-email@example.com \
  --region ap-northeast-1
```

</details>

## 🏗️ CDKプロジェクト構成

```
cdk/
├── bin/
│   └── cdk.ts              # CDKアプリのエントリーポイント
├── lib/
│   └── cdk-stack.ts        # インフラスタック定義
├── test/
│   └── cdk.test.ts         # ユニットテスト
├── cdk.json                # CDK設定
├── package.json
└── tsconfig.json
```

### 現在CDKで管理されているリソース

- ✅ **DynamoDB** - 訪問者カウンターテーブル

### 今後CDKで管理予定のリソース

- ⏳ **Lambda** - サーバーレス関数
- ⏳ **API Gateway** - REST APIエンドポイント
- ⏳ **S3 & CloudFront** - 静的サイトホスティング

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
- ✅ Infrastructure as Code（AWS CDK）

## 🔐 セキュリティ

- CloudFront で HTTPS 強制
- API Gateway で CORS 設定
- IAM ロールで最小権限の原則
- 環境変数で機密情報を管理
- S3 バケットのパブリックアクセス制御
- CDKでインフラ構成を明示的に管理

## 🛠️ CDK便利コマンド

```bash
cd cdk

# インフラの差分確認
npm run build && cdk diff

# CloudFormationテンプレート生成
cdk synth

# デプロイ
cdk deploy

# スタック削除（注意：DynamoDBテーブルは保持されます）
cdk destroy

# すべてのスタックをリスト表示
cdk list
```

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

## 📚 参考リンク

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [AWS CDK Workshop](https://cdkworkshop.com/)

## 📝 ライセンス

MIT License
