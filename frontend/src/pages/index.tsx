import { TodoInput, TodoList } from "@/components";
import { useGetAllQuery } from "@/types/generated/generated-types";
import { Box, Center, Flex, Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  const { data, loading, error } = useGetAllQuery();

  if (loading) return <Spinner />;

  return (
    <>
      <Head>
        <title>Appsync Cdk Sample</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box m={8}>
        <Center>
          <Heading>Appsync Cdk Sample</Heading>
        </Center>
      </Box>
      <main>
        <Center>
          <Box maxW={"80%"} m={8}>
            <TodoInput />
          </Box>
        </Center>
        <Flex m={4}>
          <TodoList todos={data?.getAll!} />
        </Flex>
      </main>
    </>
  );
}
