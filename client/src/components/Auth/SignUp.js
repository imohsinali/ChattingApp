import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState({ p: false, cp: false });
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conformPassword, setConformPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!name || !email || !password || !conformPassword) {
      toast({
        title: "Please Fill all the Field",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== conformPassword) {
      toast({
        title: "password does not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setEmail("");
      setName("");
      setPassword("");
      setConformPassword("");
      navigate("/chats");
      setLoading(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setEmail("");
      setName("");
      setPassword("");
      setConformPassword("");
      setLoading(false);
    }
  };
  const postDetails = (pics) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat_app");
      data.append("cloud_name", "mohsinbalti");
      fetch(
        "CLOUDINARY_URL=cloudinary://918443293798351:ykC7dg7gOX9NkEfvaH1vmTrCApQ@mohsinbalti",
        { method: "post", body: data }
      )
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl isRequired id="name">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show.p ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button
              h="1.75rem"
              size="sm"
              onClick={() =>
                setShow((e) => {
                  return { ...e, p: !e.p };
                })
              }
            >
              {show.p ? "hide" : "show"}{" "}
            </Button>{" "}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired id="cpassword">
        <FormLabel>Conform Password</FormLabel>
        <InputGroup>
          <Input
            type={show.cp ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setConformPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button
              h="1.75rem"
              size="sm"
              onClick={() =>
                setShow((e) => {
                  return { ...e, cp: !e.cp };
                })
              }
            >
              {show.cp ? "hide" : "show"}{" "}
            </Button>{" "}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired id="pic">
        <FormLabel>Upload your pic</FormLabel>
        <Input
          type={"file"}
          p={1.5}
          accept="image/"
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Sign up
      </Button>
    </VStack>
  );
};

export default SignUp;
