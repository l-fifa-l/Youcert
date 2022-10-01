import { useState, useEffect, useContext } from 'react';
import NextLink from 'next/link';
import axios from 'axios';
import {
  Flex,
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Spinner,
  Link,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { Context } from '../context';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    if (user !== null) router.push('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log({ name, password, email });
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/register`,
        {
          name,
          email,
          password,
        }
      );
      // console.log("REGISTER RESPONSE", data);
      // toast.success("Registration Successfull. Please Login.");
      setName('');
      setEmail('');
      setPassword('');
      setLoading(false);
      router.push('/signin');
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign up for an Account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="Username">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                />
              </FormControl>
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
                <Box
                  direction={{ base: 'column', sm: 'row' }}
                  align="center"
                  justify={'space-between'}
                >
                  <NextLink href="signin">
                    <Link color={'#7820c5'}>Sign in Instead!</Link>
                  </NextLink>
                </Box>

                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    There was an error processing your request
                  </Alert>
                )}

                <Button
                  bg={'#7820c5'}
                  color={'white'}
                  type={'submit'}
                  disabled={!name || !email || !password || loading}
                  _hover={{
                    bg: '#5e199a',
                  }}
                >
                  {loading ? <Spinner /> : 'Sign up'}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
