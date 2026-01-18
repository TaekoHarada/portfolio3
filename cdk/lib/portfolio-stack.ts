import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class PortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const visitorCountTable = new dynamodb.Table(this, "VisitorCountTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      tableName: "portfolio-visitor-count",
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Lambda関数
    const visitorCounterFunction = new lambda.Function(
      this,
      "VisitorCounterFunction",
      {
        runtime: lambda.Runtime.NODEJS_22_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset("lambda/visitor-counter"),
        functionName: "portfolio-visitor-counter",
        timeout: cdk.Duration.seconds(10),
        memorySize: 128,
        environment: {
          TABLE_NAME: visitorCountTable.tableName,
          REGION: "ap-northeast-1",
          ALLOWED_ORIGINS: [
            "https://dj40d41lmkwi.cloudfront.net",
            "http://localhost:3000",
          ].join(","),
        },
        description: "Portfolio visitor counter Lambda function",
      },
    );

    // Lambda関数にDynamoDBテーブルへの読み書き権限を付与
    visitorCountTable.grantReadWriteData(visitorCounterFunction);

    // テーブル名を出力
    new cdk.CfnOutput(this, "VisitorCountTableName", {
      value: visitorCountTable.tableName,
      description: "DynamoDB Visitor Count Table Name",
    });

    // テーブルのARNを出力
    new cdk.CfnOutput(this, "VisitorCountTableArn", {
      value: visitorCountTable.tableArn,
      description: "DynamoDB Visitor Count Table ARN",
    });
  }
}
