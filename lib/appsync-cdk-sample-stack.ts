import * as cdk from "aws-cdk-lib";
import * as appsync from "aws-cdk-lib/aws-appsync";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path = require("path");

export class AppsyncCdkSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, "Api", {
      name: "Todo",
      schema: appsync.SchemaFile.fromAsset(
        path.join(__dirname, "../schemas/schema.graphql")
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
    });

    const table = new dynamodb.Table(this, "TodoTable", {
      tableName: "todo-table",
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    const dataSource = api.addDynamoDbDataSource("DynamoDataSource", table);

    // query
    dataSource.createResolver("getTodosResolver", {
      typeName: "Query",
      fieldName: "getAll",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    dataSource.createResolver("getTodoResolver", {
      typeName: "Query",
      fieldName: "get",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbGetItem(
        "id",
        "id"
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    // mutation
    dataSource.createResolver("MutationResolver", {
      typeName: "Mutation",
      fieldName: "add",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition("id").auto(),
        appsync.Values.projecting("input")
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    dataSource.createResolver("Delete", {
      typeName: "Mutation",
      fieldName: "delete",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbDeleteItem(
        "id",
        "id"
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    const updateFunction = new nodejs.NodejsFunction(this, "UpdateFunction", {
      functionName: "update-function",
      entry: path.join(__dirname, "../lambda/update.ts"),
      runtime: lambda.Runtime.NODEJS_18_X,
      tracing: lambda.Tracing.ACTIVE,
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    table.grantReadWriteData(updateFunction);
    const lambdaDataSource = api.addLambdaDataSource(
      "LambdaDataSource",
      updateFunction
    );
    lambdaDataSource.createResolver("Update", {
      typeName: "Mutation",
      fieldName: "update",
    });
  }
}
