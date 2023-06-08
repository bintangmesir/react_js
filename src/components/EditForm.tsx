import { useState, useEffect } from "react";
import {
  Container,
  Flex,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  Center,
  Input,
  Button,
  Image,
  Heading,
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

export default function EditForm() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | string>("");
  const [preview, setPreview] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      alert("Please add a some text");
    } else {
      const inputValue = e.target.value;
      setTitle(inputValue);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target.value) {
      alert("Please add a some text");
    } else {
      const inputValue = e.target.value;
      setDescription(inputValue);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      alert("Please add a file image");
    } else {
      const inputValue = e.target.files[0];
      setImage(inputValue);
      setPreview(URL.createObjectURL(inputValue));
    }
  };

  useEffect(() => {
    const getDataTodos = async () => {
      try {
        const response = await fetch(`http://localhost:5000/todos/${id}`, {
          headers: {
            "Content-Type": "application/json",
            mode: "cors",
          },
        });
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setPreview(data.url);
      } catch (error) {
        console.log(error);
      }
    };

    getDataTodos();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PATCH",
        body: formData,
      });
      navigate("/");
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
        my={12}
      >
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
        <Card
          minW={"full"}
          shadow={"md"}
          borderWidth={"thin"}
          borderColor={"gray.400"}
        >
          <CardBody>
            <Center flexDir={"column"}>
              <Heading>Add Data</Heading>
              <Text>Aplikasi Todo List</Text>
              <Link to={"/"}>
                <Button ml={3} my={4} colorScheme="green">
                  Back
                </Button>
              </Link>
            </Center>
            <Flex flexDir={"column"} gap={4}>
              <form onSubmit={handleSubmit}>
                <FormControl mb={4}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    value={title}
                    onChange={handleInputChange}
                    placeholder="Input Something ..."
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={handleTextareaChange}
                    placeholder="Input Something ..."
                    size="sm"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Image</FormLabel>
                  {preview === "" ? null : (
                    <Image
                      src={preview}
                      alt={preview}
                      w={"full"}
                      h={"auto"}
                      mb={4}
                    />
                  )}
                  <Input
                    pt={1}
                    pl={1}
                    type="file"
                    onChange={handleImageChange}
                    placeholder="Input Something ..."
                  />
                </FormControl>
                <Flex justifyContent={"flex-end"} mt={8}>
                  <Button colorScheme="teal" type="submit">
                    Save
                  </Button>
                </Flex>
              </form>
            </Flex>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
