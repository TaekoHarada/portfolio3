import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "ap-northeast-1" }); // または us-east-1

export const handler = async (event) => {
  // CORSヘッダー
  const headers = {
    "Access-Control-Allow-Origin": "*", // 本番では特定のドメインに制限
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // OPTIONSリクエスト（プリフライト）対応
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { name, email, message } = body;

    // バリデーション
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "必須項目が入力されていません" }),
      };
    }

    // メール送信
    const params = {
      Source: "taecooo512@gmail.com", // SESで検証済みのメールアドレス
      Destination: {
        ToAddresses: ["taecooo512@gmail.com"], // 受信先
      },
      Message: {
        Subject: {
          Data: `【ポートフォリオ】${name}様からのお問い合わせ`,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: `
名前: ${name}
メールアドレス: ${email}

メッセージ:
${message}
            `,
            Charset: "UTF-8",
          },
        },
      },
    };

    await ses.send(new SendEmailCommand(params));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "送信しました" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "送信に失敗しました" }),
    };
  }
};
