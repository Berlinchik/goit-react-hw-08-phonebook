import s from './userMenu.module.scss';
import PropTypes from 'prop-types';
import usePortal from 'react-useportal';
import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { logout } from '../../redux/auth/auth-operation';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmail, selectLoggedIn } from '../../redux/auth/auth-selectors';

const UserMenu = ({ closeModal }) => {
  const email = useSelector(selectEmail);
  const token = useSelector(selectLoggedIn);
  const dispatch = useDispatch();
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('modal-root'),
  });

  useEffect(() => {
    window.addEventListener('keydown', handleCloseModalByEscape);

    return () => {
      window.removeEventListener('keydown', handleCloseModalByEscape);
    };
  });

  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleCloseModalByEscape = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  return (
    <Portal>
      <div className={s.Overlay} onClick={handleCloseModal}>
        <div className={s.Modal}>
          <p>{email}</p>
          <Button
            w="100px"
            colorScheme="white"
            variant="outline"
            _hover={{ bg: '#00000026' }}
            onClick={() => {
              if (window.confirm('Are you shure you want to quit?')) {
                closeModal();
                dispatch(logout(token));
              }
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </Portal>
  );
};

UserMenu.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default UserMenu;
