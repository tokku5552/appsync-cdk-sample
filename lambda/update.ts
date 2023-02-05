import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { AppSyncResolverHandler } from "aws-lambda";

import {
  MutationUpdateArgs,
  Todo,
} from "../frontend/src/types/generated/generated-types";

const db = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(db);

const TABLE_NAME = process.env.TABLE_NAME || "";

export const handler: AppSyncResolverHandler<
  MutationUpdateArgs,
  Todo | null
> = async (event) => {
  const todo = event.arguments.input;
  console.log(todo);

  const params: UpdateCommandInput = {
    TableName: TABLE_NAME,
    Key: {
      id: todo.id,
    },
    UpdateExpression: "set isDone = :c",
    ExpressionAttributeValues: {
      ":c": todo.isDone,
    },
  };
  console.log(params);

  const data = await ddb.send(new UpdateCommand(params));
  return data.Attributes as Todo;
};
