// import { createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../../../services/API";
// // import { toast } from "react-toastify";

// export const userLogin = createAsyncThunk(
//   "auth/login",
//   async ({ role, email, password }, { rejectWithValue }) => {
//     try {
//       const { data } = await API.post("/auth/login", { role, email, password });
//       //store token
//       if (data.success) {
//         alert(data.message);
//         localStorage.setItem("token", data.token);
//         window.location.replace("/");
//       }
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// //register
// export const userRegister = createAsyncThunk(
//   "auth/register",
//   async (
//     {
//       name,
//       role,
//       email,
//       password,
//       phone,
//       organisationName,
//       address,
//       hospitalName,
//       website,
//       bloodGroup,
//       image
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const { data } = await API.post("/auth/register", {
//         name,
//         role,
//         email,
//         password,
//         phone,
//         organisationName,
//         address,
//         hospitalName,
//         website,
//         bloodGroup,
//         image
//       });
//       if (data?.success) {
//         console.log(image);
//         alert("User Registered Successfully");
//         window.location.replace("/login");
//         // toast.success("User Registerd Successfully");
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// //current user
// export const getCurrentUser = createAsyncThunk(
//   "auth/getCurrentUser",
//   async (_,{ rejectWithValue }) => {
//     try {
//       const res = await API.get("/auth/current-user");
//       if (res.data) {
//         return res?.data;
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      if (data.success) {
        alert(data.message);
        localStorage.setItem("token", data.token);
        window.location.replace("/");
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      phone,
      organisationName,
      address,
      hospitalName,
      website,
      bloodGroup,
      image,
    },
    { rejectWithValue }
  ) => {
    try {
      // const { data } = await API.post("/auth/register", {
      //   name,
      //   role,
      //   email,
      //   password,
      //   phone,
      //   organisationName,
      //   address,
      //   hospitalName,
      //   website,
      //   bloodGroup,
      //   image,
      // });
      const formData = new FormData();
      formData.append('name', name);
      formData.append('role', role);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('organisationName', organisationName);
      formData.append('address', address);
      formData.append('hospitalName', hospitalName);
      formData.append('bloodGroup', bloodGroup);
      if (website) formData.append('website', website);
      if (image) formData.append('image', image); // Append the file

      // Make the API request with FormData
      const { data } = await API.post("/auth/register", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("AuthAction", image);
      if (data.success) {
        alert("User Registered Successfully");
        window.location.replace("/login");
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

