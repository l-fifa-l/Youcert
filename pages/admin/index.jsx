import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Textarea,
  Alert,
  AlertIcon,
  Spinner,
  Flex,
  HStack,
  Tag,
  Button,
  Stack,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import { Context } from '../../context';
import { useRouter } from 'next/router';

export default function addCourse() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');
  const [videoId, setVideoId] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [creator, setCreator] = useState('');
  const [description, setDiscription] = useState('');
  const [tags, setTags] = useState('');
  const [slug, setSlug] = useState('');

  //state
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  // const { user } = state;

  //router
  const router = useRouter();

  //!To Check Weather The User Is Admin Or Not(if not subscriber)
  // useEffect(() => {
  //   if (!(user && user.role && user.role.includes("Subscribe")))
  //     router.push("/");
  // }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('adding course');
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/addcourse`,
        {
          title,
          videoId,
          playlistId,
          thumbnail,
          creator,
          description,
          tags,
          slug,
        }
      );
      router.push('/signin');
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <Box
      minH={'100vh'}
      // width={"100%"}
      // align={"center"}
      // justify={"center"}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'70%'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Add a course</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="Title">
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Course Name"
                  required
                />
              </FormControl>

              <FormControl id="VideoId">
                <FormLabel>Video Id</FormLabel>
                <Input
                  type="text"
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  placeholder="Video Id"
                />
              </FormControl>

              <FormControl id="PlaylistId">
                <FormLabel>Playlist Id</FormLabel>
                <Input
                  type="text"
                  value={playlistId}
                  onChange={(e) => setPlaylistId(e.target.value)}
                  placeholder="Playlist Id"
                />
              </FormControl>

              <FormControl id="Thumbnail">
                <FormLabel>Enter slug</FormLabel>
                <Input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Thumbnail"
                  required
                />
              </FormControl>

              <FormControl id="Thumbnail">
                <FormLabel>Thumbnail</FormLabel>
                <Input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="Thumbnail"
                  required
                />
              </FormControl>

              <FormControl id="Creator">
                <FormLabel>Creator</FormLabel>
                <Input
                  type="text"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  placeholder="Creator"
                />
              </FormControl>

              <FormControl id="Description">
                <FormLabel>Description</FormLabel>
                <Textarea
                  type="text"
                  value={description}
                  onChange={(e) => setDiscription(e.target.value)}
                  placeholder="Description"
                  required
                />
              </FormControl>

              <FormControl id="Tags">
                <FormLabel>Genre</FormLabel>
                <Input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Tags"
                />
              </FormControl>
              <Stack pt={3} spacing={5}>
                <Box
                  direction={{ base: 'column', sm: 'row' }}
                  align="center"
                  justify={'space-between'}
                ></Box>

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
                  disabled={!title || !description || loading}
                  _hover={{
                    bg: '#5e199a',
                  }}
                >
                  {loading ? <Spinner /> : 'ADD COURSE'}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
