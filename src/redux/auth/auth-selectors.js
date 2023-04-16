export const selectLoggedIn = state => state.auth.token;
export const selectUserName = state => state.auth.user.name;
export const selectEmail = state => state.auth.user.email;

// onClick=
//               {() => {
//                 setModalData(true);
//               }}
