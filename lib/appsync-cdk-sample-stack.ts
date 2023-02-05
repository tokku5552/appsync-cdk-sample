import * as cdk from "aws-cdk-lib";
import * as appsync from "aws-cdk-lib/aws-appsync";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
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
    dataSource.createResolver("QueryResolver", {
      typeName: "Query",
      fieldName: "getTodos",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    // mutation
    dataSource.createResolver("MutationResolver", {
      typeName: "Mutation",
      fieldName: "addTodo",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition("id").auto(),
        appsync.Values.projecting("input")
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });
  }
}
