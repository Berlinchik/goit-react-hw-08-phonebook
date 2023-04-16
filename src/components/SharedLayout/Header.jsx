import { StyledButton, StyledLink } from './Link.styled';
import UserMenu from '../UserMenu/UserMenu';
import { Box } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import {
  selectLoggedIn,
  selectUserName,
} from '../../redux/auth/auth-selectors';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Header() {
  const [modalData, setModalData] = useState(false);
  const isAuth = useSelector(selectLoggedIn);
  const userName = useSelector(selectUserName);
  const tergetElem = document.querySelector('#root');

  const closeModal = () => {
    setModalData(null);
    enableBodyScroll(tergetElem);
  };

  return (
    <Box
      bg="#805AD5"
      w="100%"
      p={4}
      color="white"
      display="flex"
      justifyContent="space-between"
    >
      <Box display="flex">
        <StyledLink to="/">Home</StyledLink>
        {isAuth && <StyledLink to="/contacts">Contacts</StyledLink>}
      </Box>
      <Box display="flex">
        {isAuth ? (
          <>
            <Button
              fontSize="24px"
              bg="transparent"
              _hover={{
                color: 'palevioletred',
              }}
              _focus={{ backgroundColor: 'transparent' }}
              mr="30px"
              onClick={() => {
                setModalData(true);
                disableBodyScroll(tergetElem);
              }}
            >
              {userName}
            </Button>
            {modalData && (
              <UserMenu tergetElem={tergetElem} closeModal={closeModal} />
            )}
          </>
        ) : (
          <>
            <StyledButton to="/login">Login</StyledButton>
            <StyledButton to="/register">Sign Up</StyledButton>
          </>
        )}
      </Box>
    </Box>
  );
}
