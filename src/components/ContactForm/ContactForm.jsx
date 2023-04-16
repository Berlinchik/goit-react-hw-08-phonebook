import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Text } from '@chakra-ui/react';
import { selectContacts } from '../../redux/contacts/contacts-selectors';
import { addContacts } from '../../redux/contacts/contacts-operations';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const formik = useFormik({
    initialValues: {
      userName: '',
      phone: '',
    },
    onSubmit: values => {
      const elem = contacts.find(
        ({ name }) => name.toLowerCase() === values.userName.toLowerCase()
      );
      if (!elem) {
        dispatch(
          addContacts({
            name: values.userName,
            number: values.phone,
          })
        );
      } else {
        return alert(`${values.userName} is already in contacts`);
      }
      formik.resetForm();
    },
  });

  return (
    <Box
      w="400px"
      bg="white"
      p={6}
      rounded="md"
      display="flex"
      justify="start"
      flexDir="column"
      borderRight="2px solid #805ad5"
      borderRadius="0"
      mr="15px"
    >
      <Text textAlign="center" fontSize="36px" color="#805ad5">
        New contact
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4} align="flex-start">
          <FormControl>
            <FormLabel fontSize="24px" htmlFor="userName">
              Name
            </FormLabel>
            <Input
              fontSize="24px"
              id="userName"
              name="userName"
              type="text"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.userName}
              w="100%"
              h="50px"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="24px" htmlFor="phone">
              Phone
            </FormLabel>
            <Input
              w="100%"
              h="50px"
              fontSize="24px"
              id="phone"
              name="phone"
              type="tel"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </FormControl>
          <Button type="submit" w="100%" colorScheme="purple">
            Add contact
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
