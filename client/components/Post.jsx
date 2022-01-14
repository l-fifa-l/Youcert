import React from "react";
import {
  Flex,
  Box,
  AspectRatio,
  Link,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Post() {
  return (
    <>
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
          maxW="xl"
        >
          <AspectRatio rounded="lg" ratio={16 / 9}>
            <iframe
              title="naruto"
              src="https://www.youtube.com/embed/QhBnZ6NPOY0?rel=0"
              allowFullScreen
            />
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
                Learn HTML and CSS
              </Link>
            </Box>

            <Box mt={4}>
              <Flex alignItems="center">
                <Flex alignItems="center">
                  <Link
                    fontWeight="bold"
                    color={useColorModeValue("gray.700", "gray.200")}
                  >
                    By Vivek Kumar
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
        </Box>
      </Flex>
    </>
  );
}
