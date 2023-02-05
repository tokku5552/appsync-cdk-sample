import { Card, CardBody, Checkbox, HStack, Text } from "@chakra-ui/react";

export interface TodoItemProps {
  body: string;
  isDone: boolean;
}

export default function TodoItem({ body, isDone }: TodoItemProps) {
  return (
    <>
      <HStack p={8} w="full" height="16" justify="space-between">
        <Card>
          <CardBody>
            <HStack spacing={8}>
              <Checkbox size={"lg"} isChecked={isDone} />
              <Text>{body}</Text>
            </HStack>
          </CardBody>
        </Card>
      </HStack>
    </>
  );
}
