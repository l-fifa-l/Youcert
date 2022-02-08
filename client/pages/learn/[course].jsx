import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Flex,
  Box,
  AspectRatio,
  Link,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';

const Course = ({ courseData }) => {
  const [CompletedLessons, setCompletedLessons] = useState([]);
  const router = useRouter();
  const { asPath, pathname } = useRouter();
  router.asPath = '/learn/' + courseData.title;
  router.pathname = '/learn/' + courseData.title;
  router.route = '/learn/' + courseData.title;
  router.query = { course: courseData.title };
  console.log('router=>', router);
  const { course } = router.query;

  console.log(asPath); // '/blog/xyz'
  console.log(pathname); // '/blog/[slug]'

  // mark course complete function
  const complete = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
    });
    console.log(data);
    setCompletedLessons([...completedLessons]);
  };

  // mark course incomplete function
  const incomplete = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incompleted`, {
        courseId: course._id,
      });
      const all = completedLessons;
      const index = all.indexOf(course.lessons[clicked]._id);
      if (index > -1) {
        all.splice(index, 1);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Flex
        bg={useColorModeValue('#F9FAFB', 'gray.600')}
        p={5}
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
          maxW="2xl"
        >
          <AspectRatio rounded="lg" ratio={16 / 9}>
            <iframe title="naruto" src={courseData.videoId} allowFullScreen />
          </AspectRatio>

          <Box p={6}>
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

            <Box mt={4}>
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
              <Flex>
                <Box p="2" bg="red.400">
                  <Button colorScheme="teal" mr="4">
                    enroll me
                  </Button>
                </Box>
                <Spacer />
                <Box p="2" bg="green.400">
                  <Button colorScheme="teal" mr="4">
                    Complete & Claim Certificate
                  </Button>
                </Box>
              </Flex>
            </Box>
          </Box>
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
        </Box>
      </Flex>
    </>
  );
};

export async function getServerSideProps({ query, resolvedUrl }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.course}`);
  resolvedUrl = data.title;
  console.log('resolvedUrl', resolvedUrl);
  return {
    props: { courseData: data },
  };
}

export default Course;
