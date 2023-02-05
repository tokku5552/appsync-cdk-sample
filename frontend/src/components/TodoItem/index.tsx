import {
  Todo,
  UpdateInput,
  useDeleteMutation,
  useUpdateMutation,
} from "@/types/generated/generated-types";
import { DeleteIcon } from "@chakra-ui/icons";
import { Card, CardBody, Checkbox, HStack, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";

export interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [todoItem, setTodoItem] = useState<Todo | null>(todo);
  const [updateMutation, updateState] = useUpdateMutation();
  const [deleteMutation, deleteState] = useDeleteMutation();

  const handleCheck = useCallback(() => {
    if (updateState.loading) return;
    const updatedTodoItem: UpdateInput = {
      id: todoItem!.id,
      isDone: !todoItem!.isDone,
    };

    updateMutation({
      variables: { input: updatedTodoItem },
      onCompleted: () => {
        setTodoItem({ ...todoItem!, isDone: updatedTodoItem.isDone! });
      },
    });
  }, [updateState, todoItem, updateMutation]);

  const handleDelete = useCallback(() => {
    if (!todoItem) return;
    if (deleteState.loading) return;
    deleteMutation({
      variables: { input: todoItem.id },
      onCompleted: () => setTodoItem(null),
    });
  }, [deleteState, deleteMutation, todoItem]);

  if (!todoItem) return null;

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
              <DeleteIcon
                color="blue.500"
                boxSize={5}
                _hover={{ boxSize: 6 }}
                onClick={handleDelete}
              />
            </HStack>
          </CardBody>
        </Card>
      </HStack>
    </>
  );
}
