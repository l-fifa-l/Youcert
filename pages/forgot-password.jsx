import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../context";
import { useRouter } from "next/router";
import {
  Flex,
  Box,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Spinner,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [Message, setMessage] = useState("false");

  //context
  const {
    state: { user },
  } = useContext(Context);
  //router
  const router = useRouter();

  //redirect is user is logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      setLoading(false);
      setMessage("Check your email for the secret code");
      setError(true);
    } catch (err) {
      setLoading(false);
      setMessage(err);
      setError(true);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // console.log(email, code, newPassword);
    // return;
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setNewPassword("");
      setLoading(false);
      // toast("Great! Now login with your new Password");
    } catch (err) {
      setLoading(false);
      // setMessage(err.response.data);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Reset Your Password</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={success ? handleResetPassword : handleSubmit}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </FormControl>
              {success && (
                <>
                  <FormControl id="Code">
                    <FormLabel>Code</FormLabel>
                    <Input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter secret code"
                      required
                    />
                  </FormControl>
                  <FormControl id="newPassword">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                  </FormControl>
                </>
              )}

              <Stack pt={3} spacing={5}>
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    {setMessage}
                  </Alert>
                )}

                <Button
                  bg={"#7820c5"}
                  color={"white"}
                  type={"submit"}
                  disabled={!email || loading}
                  _hover={{
                    bg: "#5e199a",
                  }}
                >
                  {loading ? <Spinner /> : "Submit"}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
