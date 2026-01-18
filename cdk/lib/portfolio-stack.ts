import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class PortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const visitorCountTable = new dynamodb.Table(this, "VisitorCountTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      tableName: "portfolio-visitor-count",
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

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
