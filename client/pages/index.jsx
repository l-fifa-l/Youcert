import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import NextLink from 'next/link';
import { Context } from '../context';
// import Post from "../components/Post";
import {
  Grid,
  Flex,
  Box,
  Link,
  chakra,
  Image,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import axios from 'axios';

export default function index({ courses }) {
  const { state } = useContext(Context);
  const { user } = state;
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);
  // async function fetchData() {
  //   try {
  //     const { data } = await axios.get(`api/getallcourse`);
  //     setCourses(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <>
      <Navbar />
      {user !== null && (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            // xl: "repeat(4, 1fr)",
          }}
          gap={3}
        >
          {courses.map((course) => (
            <div key={course._id}>
              <Flex
                bg={useColorModeValue('#F9FAFB', 'gray.600')}
                p={3}
                w="full"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  mx="auto"
                  rounded="lg"
                  // shadow="md"
                  w="full"
                  bg={useColorModeValue('white', 'gray.800')}
                  maxW="xl"
                >
                  <NextLink href={`learn/${course._id}`}>
                    <Image
                      boxSize="auto"
                      borderRadius="md"
                      objectFit="cover"
                      src={course.thumbnail}
                      alt="Dan Abramov"
                    />
                  </NextLink>

                  <Box p={6}>
                    <Box>
                      <chakra.span
                        fontSize="xs"
                        textTransform="uppercase"
                        color={useColorModeValue('brand.600', 'brand.400')}
                      >
                        {course.genre}
                      </chakra.span>
                      <NextLink href={`learn/${course._id}`}>
                        <Link
                          display="block"
                          color={useColorModeValue('gray.800', 'white')}
                          fontWeight="bold"
                          fontSize="2xl"
                          mt={2}
                          _hover={{ color: 'gray.600', textDecor: 'none' }}
                        >
                          {course.title}
                        </Link>
                      </NextLink>
                    </Box>

                    <Box mt={4}>
                      <Flex alignItems="center">
                        <Flex alignItems="center">
                          <Link
                            fontWeight="bold"
                            color={useColorModeValue('gray.700', 'gray.200')}
                          >
                            By: {course.author}
                          </Link>
                        </Flex>
                        <chakra.span
                          mx={1}
                          fontSize="sm"
                          color={useColorModeValue('gray.600', 'gray.300')}
                        >
                          {/* {course.updatedAt} */}
                        </chakra.span>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </div>
          ))}
        </Grid>
      )}
      {user == null && <Heading>Login Please</Heading>}
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/getallcourse`);
  return {
    props: {
      courses: data,
    },
  };
}
