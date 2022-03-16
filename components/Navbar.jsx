import { useState, useEffect, useContext } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Text,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { Context } from '../context';
import axios from 'axios';
import { useRouter } from 'next/router';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = ['Home'];

const NavLink = ({ children }) => (
  <NextLink
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href="/"
  >
    {children}
  </NextLink>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [current, setCurrent] = useState('');
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const { user } = state;

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    // console.log(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const signout = async () => {
    dispatch({ type: 'LOGOUT' });
    window.localStorage.removeItem('user');
    const { data } = await axios.get('/api/logout');
    // toast(data.message);
    router.push('/signin');
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {user !== null && (
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          )}
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <NextLink href="/">Youcert</NextLink>
            </Box>
            {user !== null && (
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            )}
          </HStack>

          {user !== null && (
            <Flex alignItems={'center'}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'outline'}
                  decoration={'none'}
                  cursor={'pointer'}
                  p={2}
                >
                  <Stack spacing={1} direction="row">
                    <Avatar size={'sm'} src={''} />
                    <Text pt={1} fontSize="xl">
                      {user.name}
                    </Text>
                  </Stack>
                </MenuButton>
                <MenuList>
                  <NextLink href={`/${user.name}`}>
                    <MenuItem>Profile</MenuItem>
                  </NextLink>
                  <NextLink href={`/${user.name}/settings`}>
                    <MenuItem>Setting</MenuItem>
                  </NextLink>
                  <MenuDivider />
                  <MenuItem as={Button} onClick={signout}>
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}
          {user === null && (
            <Stack direction={'row'} spacing={4}>
              <NextLink href="signin">
                <Button
                  flex={1}
                  bg={'#7820c5'}
                  fontSize={'sm'}
                  color={'white'}
                  boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                  }
                  rounded={'full'}
                  _hover={{
                    bg: '#5e199a',
                  }}
                >
                  Sign In
                </Button>
              </NextLink>
              <NextLink href="signup">
                <Button
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'#7820c5'}
                  color={'white'}
                  boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                  }
                  _hover={{
                    bg: '#5e199a',
                  }}
                >
                  Sign Up
                </Button>
              </NextLink>
            </Stack>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
