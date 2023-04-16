import { useFormik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { login } from '../redux/auth/auth-operation';
import { useDispatch } from 'react-redux';

export default function App() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      dispatch(login(values));
    },
  });
  return (
    <Box
      bg="white"
      p={6}
      rounded="md"
      w="100vw"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4} display="flex" alignItems="center">
          <FormControl
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <FormLabel fontSize="24px" htmlFor="email">
              Email Address
            </FormLabel>
            <Input
              fontSize="24px"
              w="400px"
              h="50px"
              id="email"
              name="email"
              type="email"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </FormControl>
          <FormControl
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <FormLabel fontSize="24px" htmlFor="password">
              Password
            </FormLabel>
            <Input
              fontSize="24px"
              w="400px"
              h="50px"
              id="password"
              name="password"
              type="password"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </FormControl>
          <Button
            fontSize="24px"
            type="submit"
            colorScheme="purple"
            width="300px"
            h="50px"
          >
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
