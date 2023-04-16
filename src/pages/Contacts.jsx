import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import Filter from '../components/Filter/Filter';
import s from '../components/APP.module.scss';
import { getContacts } from '../redux/contacts/contacts-operations';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { selectLoading } from '../redux/contacts/contacts-selectors';

const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <div className={s.container}>
      {/* <h1 className={s.title}>Phonebook</h1> */}
      <ContactForm />
      <div className={s.contacts}>
        {isLoading ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#805ad5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : (
          <h2 className={s.title}>Contacts</h2>
        )}
        <Filter />
        <ContactList />
      </div>
    </div>
  );
};

export default Contacts;
