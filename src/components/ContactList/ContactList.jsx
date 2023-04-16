import s from './ContactList.module.scss';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/contacts-selectors';
import { useDispatch } from 'react-redux';
import { deleteContacts } from '../../redux/contacts/contacts-operations';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  return filteredContacts.length > 0 ? (
    <ul className={s.list}>
      {filteredContacts.map(({ name, number, id }) => (
        <li key={id} className={s.item}>
          {name}: {number}
          <button onClick={e => dispatch(deleteContacts(id))} className={s.btn}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p className={s.text}>You don't have contacts</p>
  );
};

export default ContactList;
