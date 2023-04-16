import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addContacts = createAsyncThunk(
  'contacts/add',
  async (newContact, thunkApi) => {
    const { token } = thunkApi.getState().auth;
    try {
      const contact = await axios
        .post('/contacts', newContact, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          return { ...newContact, id: data.id };
        });
      return contact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/delete',
  async (id, thunkApi) => {
    const { token } = thunkApi.getState().auth;
    try {
      await axios
        .delete(`/contacts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => id);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getContacts = createAsyncThunk(
  'contacts/get',
  async (_, thunkApi) => {
    const { token } = thunkApi.getState().auth;
    try {
      const { data } = await axios.get('/contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { contacts } = getState().items;

      if (!contacts.length) return true;
      return false;
    },
  }
);
