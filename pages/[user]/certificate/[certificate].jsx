import React, { useState, useEffect, useContext } from 'react';
import ReactToPdf from 'react-to-pdf';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Text,
  Stack,
  SimpleGrid,
  Icon,
  Button,
} from '@chakra-ui/react';
import { Context } from '../../../context';
import axios from 'axios';

const ref = React.createRef();
const options = {
  orientation: 'landscape',
  unit: 'in',
  format: [16, 12],
};

const Certificate = ({ certificateData }) => {
  const topBg = useColorModeValue('gray.100', 'gray.700');
  const bottomBg = useColorModeValue('white', 'gray.800');
  let [certificate, setCertificate] = useState('');
  const [courseD, setCourseD] = useState('');

  useEffect(() => {
    createCertificate();
    courseData();
  }, [certificateData]);

  const { state } = useContext(Context);
  const { user } = state;

  const createCertificate = async () => {
    try {
      const { data } = await axios.post(
        `https://youcert-server.herokuapp.com/api/getCertificate`,
        {
          courseId: certificateData._id,
        }
      );
      setCertificate(data);
    } catch (error) {
      console.log(error);
    }
  };

  const courseData = async () => {
    try {
      const { data } = await axios.get(
        `https://youcert-server.herokuapp.com/api/course/${certificateData._id}`
      );
      setCourseD(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Flex
        boxSize="full"
        p={10}
        alignItems="center"
        justifyContent="center"
        ref={ref}
      >
        <Box
          mx="auto"
          textAlign={{ base: 'left', md: 'center' }}
          rounded="md"
          shadow="base"
          w={['full', 'full', '90%']}
          bg={bottomBg}
          alignItems="center"
          justifyContent="center"
        >
          <Box pt={5} rounded="md" bg={topBg}>
            <Box w="full" px={[10, , 4]} mx="auto">
              <Text fontSize="5xl" fontWeight="bold" lineHeight="tight">
                CERTIFICATE OF COMPLETION
              </Text>
              <chakra.p
                mb={6}
                fontSize={['lg', , 'xl']}
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                This Certificate is awarded for completing the online course
              </chakra.p>
            </Box>
            <Box bgGradient={`linear(to-b, ${topBg} 50%, ${bottomBg} 50%)`}>
              <Flex
                rounded="md"
                mx={10}
                bg={bottomBg}
                shadow="xl"
                mb="80px"
                textAlign="left"
                direction={{ base: 'column', lg: 'row' }}
              >
                <Stack spacing={8} p="45px" flex="0.7">
                  <Text fontSize="3xl" fontWeight="bold" lineHeight="tight">
                    {certificateData.title}
                  </Text>
                  <chakra.p
                    fontSize={['sm', , 'md']}
                    color={useColorModeValue('gray.600', 'gray.400')}
                  >
                    {certificateData.description}
                  </chakra.p>
                </Stack>
                <Stack
                  p="45px"
                  flex="0.3"
                  justify="center"
                  align="center"
                  bg={useColorModeValue('#F9FAFB', 'gray.900')}
                  borderRightRadius="md"
                >
                  <Text fontSize="xl" fontWeight="semibold">
                    To
                  </Text>
                  <Flex
                    align="center"
                    fontSize="3xl"
                    fontWeight={['bold', , 'extrabold']}
                    lineHeight="tight"
                  >
                    {user ? user.name : ''}
                  </Flex>
                  <Text fontSize="xl" fontWeight="semibold">
                    By
                  </Text>
                  <Flex
                    align="center"
                    fontSize="3xl"
                    fontWeight={['bold', , 'extrabold']}
                    lineHeight="tight"
                  >
                    YOUCERT
                  </Flex>
                </Stack>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>
      <Box
        mx="auto"
        textAlign="center"
        fontSize="md"
        fontWeight={['bold', , 'extrabold']}
        shadow="base"
        bg="gray"
        alignItems="center"
        justifyContent="center"
      >
        <ReactToPdf
          targetRef={ref}
          filename="certificate.pdf"
          options={options}
        >
          {({ toPdf }) => <button onClick={toPdf}>Generate pdf</button>}
        </ReactToPdf>
      </Box>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(
    `${process.env.API}/course/${query.certificate}`
  );
  return {
    props: { certificateData: data },
  };
}

export default Certificate;
