import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
// 環境変数から取得
const REGION = process.env.REGION || "ap-northeast-1";
const TABLE_NAME = process.env.TABLE_NAME;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["https://dj40d41lmkwi.cloudfront.net", "http://localhost:3000"];

const client = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  console.log("Event:", JSON.stringify(event, null, 2));

  const origin = event.headers?.origin || event.headers?.Origin;

  // CORSヘッダー
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin)
      ? origin
      : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // プリフライトリクエスト対応
  if (
    event.httpMethod === "OPTIONS" ||
    event.requestContext?.http?.method === "OPTIONS"
  ) {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    // カウントを取得
    const getParams = {
      TableName: TABLE_NAME,
      Key: { id: "total" },
    };

    const getResult = await docClient.send(new GetCommand(getParams));
    const currentCount = getResult.Item?.count || 0;

    // カウントをインクリメント
    const updateParams = {
      TableName: TABLE_NAME,
      Key: { id: "total" },
      UpdateExpression: "SET #count = if_not_exists(#count, :start) + :inc",
      ExpressionAttributeNames: {
        "#count": "count",
      },
      ExpressionAttributeValues: {
        ":inc": 1,
        ":start": 0,
      },
      ReturnValues: "UPDATED_NEW",
    };

    const updateResult = await docClient.send(new UpdateCommand(updateParams));
    const newCount = updateResult.Attributes.count;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        count: newCount,
        message: "Visitor count updated successfully",
      }),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to update visitor count",
        message: error.message,
      }),
    };
  }
};
