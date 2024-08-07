import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please Provide All Fields");
    }
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
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
  image
) => {
  e.preventDefault();
  try {
    const registrationData = {
      name,
      role,
      email,
      password,
      phone,
      organisationName,
      address,
      hospitalName,
      bloodGroup,
      image
    };
    console.log("handleReg", image);
    // Conditionally add the website field if role is not donor or admin
    if (role !== "donor" && role !== "admin") {
      registrationData.website = website;
    }

    store.dispatch(userRegister(registrationData));
  } catch (error) {
    console.log(error);
  }
};