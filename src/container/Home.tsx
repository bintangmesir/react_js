import { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Center,
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Todo from "../utils/interface/todo";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [datas, setDatas] = useState<Todo[]>([]);

  const getDataTodos = async () => {
    try {
      const response = await fetch(`http://localhost:5000/todos`, {
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
      });
      const data = await response.json();
      setDatas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataTodos();
  }, []);

  const deleteDataTodos = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
      });
      getDataTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container
        display={"flex"}
        maxW={"container.sm"}
        minH={"100vh"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={8}
      >
        <Card
          minW={"full"}
          shadow={"md"}
          borderWidth={"thin"}
          borderColor={"gray.400"}
        >
          <CardBody>
            <Center flexDir={"column"} my={4}>
              <Heading>Selamat Datang</Heading>
              <Text>Aplikasi Todo List</Text>
            </Center>
            <Flex w="full" alignItems={"center"}>
              <Button mr={"auto"} onClick={toggleColorMode}>
                Toggle {colorMode === "light" ? "Dark" : "Light"}
              </Button>
              <Link to={"/add"}>
                <Button my={4} colorScheme="green">
                  Add
                </Button>
              </Link>
            </Flex>
            <Flex flexDir={"column"} gap={4}>
              {datas.map((data, id) => (
                <Card
                  key={id}
                  shadow={"md"}
                  borderWidth={"thin"}
                  borderColor={"gray.400"}
                >
                  <CardBody display={"flex"} flexDir={"column"} gap={2}>
                    <Heading fontSize={"lg"}>{data?.title}</Heading>
                    <Flex alignItems={"center"} gap={2}>
                      <Link to={`/show/${data.id}`}>
                        <Button size="xs" colorScheme="blue">
                          Show
                        </Button>
                      </Link>
                      <Link to={`/edit/${data.id}`}>
                        <Button size="xs" colorScheme="green">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => deleteDataTodos(data.id)}
                        size="xs"
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </Flex>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
