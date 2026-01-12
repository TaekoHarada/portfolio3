import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "ap-northeast-1" });

export const handler = async (event) => {
  // CORSヘッダー
  const headers = {
    "Access-Control-Allow-Origin": "*", // 本番では特定のドメインに制限
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // OPTIONSリクエスト（プリフライト）対応
  if (event.requestContext?.http?.method === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    // Lambda統合の場合、eventがそのままリクエストボディ
    const { email, subject, message } = event;

    console.log("Received data:", { email, subject, message });

    // バリデーション
    if (!email || !subject || !message) {
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
          Data: `【ポートフォリオ】${subject}`,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: `
メールアドレス: ${email}
件名: ${subject}

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
