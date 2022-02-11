import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Flex,
  Button,
  Box,
  AspectRatio,
  Link,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  chakra,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';

const Course = ({ courseData }) => {
  const [courseCompleted, setCourseCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadCompletedCourses();
  }, []);

  const loadCompletedCourses = async () => {
    try {
      const { data } = await axios.post(`/api/completed-course`, {
        courseId: courseData._id,
      });
      if (data === true) {
        console.log('if', data);
        setCourseCompleted(true);
      }
      console.log('existing', data);
    } catch (error) {
      console.log(error);
    }
  };

  // mark course complete function
  const complete = async () => {
    try {
      const { data } = await axios.post(`/api/mark-completed`, {
        courseId: courseData._id,
      });
      setCourseCompleted(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // mark course incomplete function
  const incomplete = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incompleted`, {
        courseId: courseData._id,
      });
      setCourseCompleted(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
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
          maxW="4xl"
        >
          <AspectRatio rounded="lg" ratio={16 / 9}>
            <iframe title="naruto" src={courseData.videoId} allowFullScreen />
          </AspectRatio>
          <Box>
            {/* Course Details */}
            <Flex>
              <Box>
                <chakra.span
                  fontSize="xs"
                  textTransform="uppercase"
                  color={useColorModeValue('brand.600', 'brand.400')}
                >
                  Course
                </chakra.span>
                <Link
                  display="block"
                  color={useColorModeValue('gray.800', 'white')}
                  fontWeight="bold"
                  fontSize="2xl"
                  mt={2}
                  _hover={{ color: 'gray.600', textDecor: 'none' }}
                >
                  {courseData.title}
                </Link>
              </Box>
              <Spacer />
              <Box mt={10}>
                <Flex alignItems="center">
                  <Flex alignItems="center">
                    <Link
                      fontWeight="bold"
                      color={useColorModeValue('gray.700', 'gray.200')}
                    >
                      By {courseData.author}
                    </Link>
                  </Flex>
                  <chakra.span
                    mx={1}
                    fontSize="sm"
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    11/11/21
                  </chakra.span>
                </Flex>
              </Box>
            </Flex>
            {/* END Course Details */}
            {/* enroll and claim certificate */}
            <Flex mt={3}>
              <Box p="2">
                {!courseCompleted ? (
                  <Button colorScheme="teal" mr="0" onClick={complete}>
                    Mark Complete
                  </Button>
                ) : (
                  <Button colorScheme="teal" mr="0" onClick={incomplete}>
                    Mark Incomplete
                  </Button>
                )}
              </Box>
              <Spacer />
              <Box p="2">
                <Button colorScheme="teal" mr="0">
                  Claim Certificate
                </Button>
              </Box>
            </Flex>
            {/* END enroll and claim certificate */}
          </Box>
          {/* Description And timestamps */}
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Timestamps</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>{courseData.description}</p>
              </TabPanel>
              <TabPanel>
                <p>NOT Available</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/* END Description And timestamps */}
        </Box>
      </Flex>
    </>
  );
};

export async function getServerSideProps({ query, resolvedUrl }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.course}`);
  resolvedUrl = data.title;
  return {
    props: { courseData: data },
  };
}

export default Course;
