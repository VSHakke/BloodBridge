// // // import { createSlice } from "@reduxjs/toolkit";
// // // import { getCurrentUser, userLogin, userRegister } from "./authActions";

// // // const token = localStorage.getItem("token")
// // //   ? localStorage.getItem("token")
// // //   : null;

// // // const initialState = {
// // //   loading: false,
// // //   user: null,
// // //   token,
// // //   error: null,
// // // };

// // // const authSlice = createSlice({
// // //   name: "auth",
// // //   initialState: initialState,
// // //   reducers: {},
// // //   extraReducers: (builder) => {
// // //     // login user
// // //     builder.addCase(userLogin.pending, (state) => {
// // //       state.loading = true;
// // //       state.error = null;
// // //     });
// // //     builder.addCase(userLogin.fulfilled, (state, { payload }) => {
// // //       state.loading = false;
// // //       state.user = payload.user;
// // //       state.token = payload.token;
// // //     });
// // //     builder.addCase(userLogin.rejected, (state, { payload }) => {
// // //       state.loading = false;
// // //       state.error = payload;
// // //     });
// // //     // REGISTER user
// // //     builder.addCase(userRegister.pending, (state) => {
// // //       state.loading = true;
// // //       state.error = null;
// // //     });
// // //     builder.addCase(userRegister.fulfilled, (state, { payload }) => {
// // //       state.loading = false;
// // //       state.user = payload.user;
// // //     });
// // //     builder.addCase(userRegister.rejected, (state, { payload }) => {
// // //       state.loading = false;
// // //       state.error = payload;
// // //     });
// // //     // CURRENT user
// // //     builder.addCase(getCurrentUser.pending, (state) => {
// // //       state.loading = true;
// // //       state.error = null;
// // //     });
// // //     builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
// // //       state.loading = false;
// // //       state.user = payload.user;
// // //     });
// // //     builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
// // //       state.loading = false;
// // //       state.error = payload;
// // //     });
// // //   },
// // // });

// // // export default authSlice;
// // import { createSlice } from "@reduxjs/toolkit";
// // import { getCurrentUser, userLogin, userRegister } from "./authActions";

// // const token = localStorage.getItem("token") || null;

// // const initialState = {
// //   loading: false,
// //   user: null,
// //   token,
// //   error: null,
// // };

// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     // Login user
// //     builder.addCase(userLogin.pending, (state) => {
// //       state.loading = true;
// //       state.error = null;
// //     });
// //     builder.addCase(userLogin.fulfilled, (state, { payload }) => {
// //       state.loading = false;
// //       state.user = payload?.user || null; // Handle undefined user
// //       state.token = payload?.token || null; // Handle undefined token
// //     });
// //     builder.addCase(userLogin.rejected, (state, { payload }) => {
// //       state.loading = false;
// //       state.error = payload || 'Login failed'; // Default error message
// //     });
    
// //     // Register user
// //     builder.addCase(userRegister.pending, (state) => {
// //       state.loading = true;
// //       state.error = null;
// //     });
// //     builder.addCase(userRegister.fulfilled, (state, { payload }) => {
// //       state.loading = false;
// //       state.user = payload?.user || null; // Handle undefined user
// //     });
// //     builder.addCase(userRegister.rejected, (state, { payload }) => {
// //       state.loading = false;
// //       state.error = payload || 'Registration failed'; // Default error message
// //     });
    
// //     // Get current user
// //     builder.addCase(getCurrentUser.pending, (state) => {
// //       state.loading = true;
// //       state.error = null;
// //     });
// //     builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
// //       state.loading = false;
// //       state.user = payload?.user || null; // Handle undefined user
// //     });
// //     builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
// //       state.loading = false;
// //       state.error = payload || 'Failed to fetch current user'; // Default error message
// //     });
// //   },
// // });

// // export default authSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";
// import { getCurrentUser, userLogin, userRegister } from "./authActions";

// const token = localStorage.getItem("token") || null;

// const initialState = {
//   loading: false,
//   user: null,
//   token,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {}, // For synchronous actions (if any)
//   extraReducers: (builder) => {
//     // Handle pending, fulfilled, and rejected states for async actions
//     builder.addCase(userLogin.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(userLogin.fulfilled, (state, { payload }) => {
//       state.loading = false;
//       state.user = payload?.user || null;
//       state.token = payload?.token || null;
//     });
//     builder.addCase(userLogin.rejected, (state, { payload }) => {
//       state.loading = false;
//       state.error = payload || 'Login failed';
//     });

//     builder.addCase(userRegister.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(userRegister.fulfilled, (state, { payload }) => {
//       state.loading = false;
//       state.user = payload?.user || null;
//     });
//     builder.addCase(userRegister.rejected, (state, { payload }) => {
//       state.loading = false;
//       state.error = payload || 'Registration failed';
//     });

//     builder.addCase(getCurrentUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
//       state.loading = false;
//       state.user = payload?.user || null;
//     });
//     builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
//       state.loading = false;
//       state.error = payload || 'Failed to fetch current user';
//     });
//   },
// });

// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "./authActions";

const token = localStorage.getItem("token") || null;

const initialState = {
  loading: false,
  user: null,
  token,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, // For synchronous actions (if any)
  extraReducers: (builder) => {
    // Handle pending, fulfilled, and rejected states for async actions
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload?.user || null;
      state.token = payload?.token || null;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || "Login failed";
    });

    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload?.user || null;
    });
    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || "Registration failed";
    });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload?.user || null;
    });
    builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || "Failed to fetch current user";
    });
  },
});

export default authSlice.reducer;
