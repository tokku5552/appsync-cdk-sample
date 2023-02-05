import {
  Todo,
  UpdateInput,
  useUpdateMutation,
} from "@/types/generated/generated-types";
import { Card, CardBody, Checkbox, HStack, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";

export interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [todoItem, setTodoItem] = useState(todo);
  const [updateMutation, { data, loading, error }] = useUpdateMutation();

  const handleCheck = useCallback(() => {
    if (loading) return;
    const updatedTodoItem: UpdateInput = {
      id: todoItem.id,
      isDone: !todoItem.isDone,
    };

    updateMutation({
      variables: { input: updatedTodoItem },
      onCompleted: () => {
        setTodoItem({ ...todoItem, isDone: updatedTodoItem.isDone! });
      },
    });
  }, [loading, todoItem, updateMutation]);

  return (
    <>
      <HStack p={8} w="full" height="16" justify="space-between">
        <Card w={540}>
          <CardBody>
            <HStack spacing={8}>
              <Checkbox
                size={"lg"}
                isChecked={todoItem.isDone}
                onChange={handleCheck}
              />
              <Text>{todoItem.title}</Text>
            </HStack>
          </CardBody>
        </Card>
      </HStack>
    </>
  );
}
