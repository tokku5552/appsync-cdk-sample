import { Todo } from "@/types/generated/generated-types";
import { List, ListItem } from "@chakra-ui/react";
import TodoItem from "../TodoItem";

export interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  return (
    <>
      <List spacing={3}>
        {todos.map((todo) => {
          return (
            <>
              <ListItem>
                <TodoItem todo={todo} />
              </ListItem>
            </>
          );
        })}
      </List>
    </>
  );
}
