import { useState, useContext, useEffect } from "react";
import axios from "axios";
import NextLink from "next/link";
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
  Link,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Navbar() {
  const [email, setEmail] = useState("starktestic@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //state
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  // const { user } = state;

  //router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log({ name, password, email });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      // console.log("REGISTER RESPONSE", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      // save in the user in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      //redirect
      router.push("/");
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
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
          <Heading fontSize={"4xl"}>Sign in to your Account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
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
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </FormControl>
              <Stack pt={3} spacing={5}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <NextLink href="signup">
                    <Link color={"#7820c5"}>Sign up for an Account</Link>
                  </NextLink>
                  <NextLink href="forgot-password">
                    <Link color={"#7820c5"}>Forgot password?</Link>
                  </NextLink>
                </Stack>
                <Stack>
                  {error && (
                    <Alert status="error">
                      <AlertIcon />
                      Email and Password does not match.
                    </Alert>
                  )}
                </Stack>
                <Button
                  bg={"#7820c5"}
                  color={"white"}
                  type={"submit"}
                  disabled={!email || loading}
                  _hover={{
                    bg: "#5e199a",
                  }}
                >
                  {loading ? <Spinner /> : "Sign in"}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
