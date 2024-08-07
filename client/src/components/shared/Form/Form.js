// import React, { useState } from "react";
// import InputType from "./InputType";
// import { Link } from "react-router-dom";
// import { handleLogin, handleRegister } from "../../../services/authService";

// const Form = ({ formType, submitBtn, formTitle }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("donor");
//   const [name, setName] = useState("");
//   const [organisationName, setOrganisationName] = useState("");
//   const [hospitalName, setHospitalName] = useState("");
//   const [website, setWebsite] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [image, setImage] = useState(null);//%%

//   const handleImageChange = (e) => {//%%
//     setImage(e.target.files[0]);
//   };

//   return (
//     <div>
//       <form
//         onSubmit={(e) => {
//           if (formType === "login")
//             return handleLogin(e, email, password, role);
//           else if (formType === "register")
//             return handleRegister(
//               e,
//               name,
//               role,
//               email,
//               password,
//               phone,
//               organisationName,
//               address,
//               hospitalName,
//               website,
//               bloodGroup,
//               image
//             );
//         }}
//       >
//         <h1 className="text-center">{formTitle}</h1>
//         <hr />
//         <div className="d-flex mb-3">
//           <div className="form-check">
//             <input
//               type="radio"
//               className="form-check-input"
//               name="role"
//               id="donorRadio"
//               value={"donor"}
//               onChange={(e) => setRole(e.target.value)}
//               defaultChecked
//             />
//             <label htmlFor="adminRadio" className="form-check-label">
//               Donor
//             </label>
//           </div>
//           <div className="form-check ms-2">
//             <input
//               type="radio"
//               className="form-check-input"
//               name="role"
//               id="adminRadio"
//               value={"admin"}
//               onChange={(e) => setRole(e.target.value)}
//             />
//             <label htmlFor="adminRadio" className="form-check-label">
//               Admin
//             </label>
//           </div>
//           <div className="form-check ms-2">
//             <input
//               type="radio"
//               className="form-check-input"
//               name="role"
//               id="hospitalRadio"
//               value={"hospital"}
//               onChange={(e) => setRole(e.target.value)}
//             />
//             <label htmlFor="hospitalRadio" className="form-check-label">
//               Hospital
//             </label>
//           </div>
//           <div className="form-check ms-2">
//             <input
//               type="radio"
//               className="form-check-input"
//               name="role"
//               id="organisationRadio"
//               value={"organisation"}
//               onChange={(e) => setRole(e.target.value)}
//             />
//             <label htmlFor="organisationRadio" className="form-check-label">
//               Organisation
//             </label>
//           </div>
//         </div>
//         {/* switch statement */}
//         {(() => {
//           //eslint-disable-next-line
//           switch (true) {
//             case formType === "login": {
//               return (
//                 <>
//                   <InputType
//                     labelText={"Email"}
//                     labelFor={"forEmail"}
//                     inputType={"email"}
//                     name={"email"}
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <InputType
//                     labelText={"Password"}
//                     labelFor={"forPassword"}
//                     inputType={"password"}
//                     name={"password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </>
//               );
//             }
//             case formType === "register": {
//               return (
//                 <>
//                   {(role === "admin" || role === "donor") && (
//                     <InputType
//                       labelText={"Name"}
//                       labelFor={"forName"}
//                       inputType={"text"}
//                       name={"name"}
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                     />
//                   )}
//                   {role === "organisation" && (
//                     <InputType
//                       labelText={"Organisation Name"}
//                       labelFor={"fororganisationName"}
//                       inputType={"text"}
//                       name={"organisationName"}
//                       value={organisationName}
//                       onChange={(e) => setOrganisationName(e.target.value)}
//                     />
//                   )}
//                   {role === "hospital" && (
//                     <InputType
//                       labelText={"Hospital Name"}
//                       labelFor={"forHospitalName"}
//                       inputType={"text"}
//                       name={"hospitalName"}
//                       value={hospitalName}
//                       onChange={(e) => setHospitalName(e.target.value)}
//                     />
//                   )}

//                   <InputType
//                     labelText={"Email"}
//                     labelFor={"forEmail"}
//                     inputType={"email"}
//                     name={"email"}
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <InputType
//                     labelText={"Password"}
//                     labelFor={"forPassword"}
//                     inputType={"password"}
//                     name={"password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   {(role === "hospital" || role === "organisation") && (
//                     <InputType
//                       labelText={"Website"}
//                       labelFor={"forWebsite"}
//                       inputType={"text"}
//                       name={"website"}
//                       value={website}
//                       onChange={(e) => setWebsite(e.target.value)}
//                     />
//                   )}
//                   <InputType
//                     labelText={"Address"}
//                     labelFor={"forAddress"}
//                     inputType={"text"}
//                     name={"address"}
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                   />
//                   <InputType
//                     labelText={"Phone"}
//                     labelFor={"forPhone"}
//                     inputType={"text"}
//                     name={"phone"}
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                   {
//                     (role === "donor") && (
//                       <InputType
//                       labelText={"Blood Group"}
//                       labelFor={"forBloodGroup"}
//                       inputType={"text"}
//                       name={"bloodGroup"}
//                       value={bloodGroup}
//                       onChange={(e) => setBloodGroup(e.target.value)}
//                   />
//                     )
//                   }
//                   <InputType
//                     labelText={"Profile Image"}
//                     labelFor={"forImage"}
//                     inputType={"file"}
//                     name={"image"}
//                     onChange={handleImageChange}
//                   />
//                 </>
//               );
//             }
//           }
//         })()}

//         <div className="d-flex flex-row justify-content-between">
//           {formType === "login" ? (
//             <p>
//               Not registered yet? Please
//               <Link to="/register"> Register!</Link>
//             </p>
//           ) : (
//             <p>
//               Already user! Please
//               <Link to="/login"> Login!</Link>
//             </p>
//           )}
//           <button className="btn btn-primary" type="submit">
//             {submitBtn}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Form;

import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [image, setImage] = useState(null); //%%

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Assuming you have state to manage the selected file
    }
    else{
      console.log("Image not uploaded");
    }
    // const file = e.target.files[0];
    // setFileToBase(file);
    // console.log(file);
  };
  // const setFileToBase = (file) =>{
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend=()=>{
  //     setImage(reader.result);
  //   }
  //   console.log("done image")
  // }

  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register") {
            // const formData = new FormData();
            // formData.append("name", name);
            // formData.append("role", role);
            // formData.append("email", email);
            // formData.append("password", password);
            // formData.append("phone", phone);
            // formData.append("organisationName", organisationName);
            // formData.append("address", address);
            // formData.append("hospitalName", hospitalName);
            // formData.append("website", website);
            // formData.append("bloodGroup", bloodGroup);
            // formData.append("image", image);
            // console.log(formData);
            // return handleRegister(e, formData);
            console.log("***", name, image, "****");
            return handleRegister(
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
            );
          }
        }}
        encType="multipart/form-data"
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donorRadio"
              value={"donor"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Donor
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="form-check-label">
              Organisation
            </label>
          </div>
        </div>
        {/* switch statement */}
        {(() => {
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donor") && (
                    <InputType
                      labelText={"Name"}
                      labelFor={"forName"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelText={"Organisation Name"}
                      labelFor={"fororganisationName"}
                      inputType={"text"}
                      name={"organisationName"}
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      labelText={"Hospital Name"}
                      labelFor={"forHospitalName"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}

                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {(role === "hospital" || role === "organisation") && (
                    <InputType
                      labelText={"Website"}
                      labelFor={"forWebsite"}
                      inputType={"text"}
                      name={"website"}
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  )}
                  <InputType
                    labelText={"Address"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {role === "donor" && (
                    <InputType
                      labelText={"Blood Group"}
                      labelFor={"forBloodGroup"}
                      inputType={"text"}
                      name={"bloodGroup"}
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                    />
                  )}
                  <InputType
                    labelText={"Profile Image"}
                    labelFor={"forImage"}
                    inputType={"file"}
                    name={"image"}
                    onChange={handleImageChange}
                  />
                </>
              );
            }
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Not registered yet? Please
              <Link to="/register"> Register!</Link>
            </p>
          ) : (
            <p>
              Already user! Please
              <Link to="/login"> Login!</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
