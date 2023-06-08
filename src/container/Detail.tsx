import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Button,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Todo from "../utils/interface/todo";

export default function Detail() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [datas, setDatas] = useState<Todo>({
    id: 0,
    title: "",
    description: "",
    image: "",
    url: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const getDataTodosById = async () => {
      try {
        const response = await fetch(`http://localhost:5000/todos/${id}`, {
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
    getDataTodosById();
  }, [id]);

  return (
    <>
      <Container
        display={"flex"}
        my={12}
        maxW={"container.sm"}
        minH={"100vh"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={8}
      >
        <Flex w={"full"} alignItems={"center"}>
          <Button onClick={toggleColorMode} mr={"auto"}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
          <Link to={"/"}>
            <Button my={4} ml={3} colorScheme="red">
              Back
            </Button>
          </Link>
        </Flex>
        <Flex flexDir={"column"} gap={4}>
          <Image src={datas.url} alt={datas.image} />
          <Heading>{datas.title}</Heading>
          <Box>
            {datas.description.split(/\r?\n/).map((data, id) => (
              <Box key={id}>
                {" "}
                {data !== "" ? (
                  <>
                    <Text pb={0}>{data}</Text>
                  </>
                ) : (
                  <br />
                )}
              </Box>
            ))}
          </Box>
        </Flex>
      </Container>
    </>
  );
}
