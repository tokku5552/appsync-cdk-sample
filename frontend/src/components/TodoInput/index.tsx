import {
  namedOperations,
  useAddMutation,
} from "@/types/generated/generated-types";
import { Button, HStack, Input } from "@chakra-ui/react";
import { useCallback, useState } from "react";

export default function TodoInput() {
  const [todo, setTodo] = useState<string>("");
  const clear = useCallback(() => setTodo(""), []);
  const [addMutation, { loading }] = useAddMutation();

  const handleClick = useCallback(() => {
    addMutation({
      variables: { input: { title: todo, isDone: false } },
      refetchQueries: [namedOperations.Query.getAll],
      onCompleted: clear,
    });
  }, [todo, addMutation, clear]);

  return (
    <>
      <HStack spacing={6}>
        <Input
          value={todo}
          onChange={(element) => setTodo(element.target.value)}
        />
        <Button disabled={!todo} isLoading={loading} onClick={handleClick}>
          add
        </Button>
      </HStack>
    </>
  );
}
