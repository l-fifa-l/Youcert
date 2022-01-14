import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";

const Course = ({ courseData }) => {
  // const [thisCourse, setThisCourse] = useState([]);

  const router = useRouter();
  const { course } = router.query;
  // console.log(courseData);

  return (
    <>
      <Navbar />
      <Flex
        bg={useColorModeValue("#F9FAFB", "gray.600")}
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
          bg={useColorModeValue("white", "gray.800")}
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
                color={useColorModeValue("brand.600", "brand.400")}
              >
                Course
              </chakra.span>
              <Link
                display="block"
                color={useColorModeValue("gray.800", "white")}
                fontWeight="bold"
                fontSize="2xl"
                mt={2}
                _hover={{ color: "gray.600", textDecor: "none" }}
              >
                {courseData.title}
              </Link>
            </Box>

            <Box mt={4}>
              <Flex alignItems="center">
                <Flex alignItems="center">
                  <Link
                    fontWeight="bold"
                    color={useColorModeValue("gray.700", "gray.200")}
                  >
                    By {courseData.author}
                  </Link>
                </Flex>
                <chakra.span
                  mx={1}
                  fontSize="sm"
                  color={useColorModeValue("gray.600", "gray.300")}
                >
                  11/11/21
                </chakra.span>
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

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.course}`);
  console.log(query);
  return {
    props: {
      courseData: data,
    },
  };
}

export default Course;
