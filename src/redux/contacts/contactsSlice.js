import { createSlice } from '@reduxjs/toolkit';
import {
  addContacts,
  getContacts,
  deleteContacts,
} from './contacts-operations';
import { logout } from '../auth/auth-operation';

const initState = {
  contacts: [],
  filter: '',
  isLoading: false,
};

const contactsSlice = createSlice({
  name: 'items',
  initialState: initState,
  reducers: {
    changeFilter(state, { payload }) {
      return {
        ...state,
        filter: payload,
      };
    },
  },
  extraReducers: buileder => {
    buileder
      .addCase(addContacts.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          contacts: [...state.contacts, payload],
        };
        // state.isLoading = false;
        // state.contacts = [...state.contacts, payload];
      })
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          contacts: [...payload],
        };
        // state.isLoading = false;
        // state.contacts = payload;
      })
      .addCase(deleteContacts.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          contacts: [...state.contacts.filter(el => el.id !== payload)],
        };
        // state.isLoading = false;
        // state.contacts = state.contacts.filter(el => el.id !== payload);
      })
      .addCase(logout.fulfilled, () => {
        return {
          ...initState,
        };
      })
      .addMatcher(
        action =>
          action.type.startsWith('contacts') &&
          action.type.endsWith('/pending'),
        state => {
          return {
            ...state,
            isLoading: true,
          };
          // state.contacts.isLoading = true;
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith('contacts') &&
          action.type.endsWith('/rejected'),
        (state, { payload }) => {
          return {
            ...state,
            isLoading: false,
            error: payload,
          };
          // state.contacts.isLoading = false;
          // state.contacts.error = payload;
        }
      );
  },
});

export const { changeFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
