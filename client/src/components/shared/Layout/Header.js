// import React, { useState } from 'react';
// import { BiDonateBlood, BiUserCircle } from 'react-icons/bi';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileCard from '../modal/ProfileCardModal'; // Adjust path as per your project structure

// const Header = () => {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showProfileCard, setShowProfileCard] = useState(false);

//   // logout handler
//   const handleLogout = () => {
//     localStorage.clear();
//     alert('Logout Successfully');
//     navigate('/login');
//   };

//   const toggleProfileCard = () => setShowProfileCard(!showProfileCard);

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
//         <div className="container-fluid">
//           <Link className="navbar-brand d-flex align-items-center" to="/">
//             <BiDonateBlood color="white" size={30} className="me-2" />
//             <span className="h4 mb-0 text-white">BloodBridge</span>
//           </Link>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               {user?.role !== 'donor' && (location.pathname === '/admin' || location.pathname === '/hospital') && (
//                 <li className="nav-item mx-3">
//                   <Link to="/analytics" className="nav-link text-white">
//                     Analytics
//                   </Link>
//                 </li>
//               )}
//               {user?.role !== 'donor' && (
//                 <li className="nav-item mx-3">
//                   <Link to="/" className="nav-link text-white">
//                     Home
//                   </Link>
//                 </li>
//               )}
//               <li className="nav-item mx-3 position-relative">
//                 <div className="nav-link text-white" onClick={toggleProfileCard} style={{ cursor: 'pointer' }}>
//                   <BiUserCircle size={30} variant="primary" onClick={toggleProfileCard}/>
//                 </div>
//                 {showProfileCard && (
//                   <div className="profile-card-modal" >
//                     <ProfileCard onClose={toggleProfileCard}/>
//                   </div>
//                 )}
//               </li>
//               <li className="nav-item mx-3">
//                 <button className="btn btn-light text-danger" onClick={handleLogout}>
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileCard from "../modal/ProfileCardModal"; // Adjust path as per your project structure

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showProfileCard, setShowProfileCard] = useState(false);

  // logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };

  const toggleProfileCard = () => setShowProfileCard(!showProfileCard);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <BiDonateBlood color="white" size={30} className="me-2" />
            <span className="h4 mb-0 text-white">BloodBridge</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-3">
                <Link to="/" className="nav-link text-white">
                  Home
                </Link>
              </li>
              {(user?.role === "organisation") && (
                <li className="nav-item mx-3">
                  <Link to="/analytics" className="nav-link text-white">
                    Analytics
                  </Link>
                </li>
              )}
              {(user?.role === "admin") && (
                <li className="nav-item mx-3">
                  <Link to="/analytics-for-admin" className="nav-link text-white">
                    Analytics
                  </Link>
                </li>
              )}
              <li className="nav-item mx-3 position-relative">
                <div
                  className="nav-link text-white"
                  onClick={toggleProfileCard}
                  style={{ cursor: "pointer" }}
                >
                  <BiUserCircle size={30} variant="primary" />
                </div>
                {showProfileCard && (
                  <div className="profile-card-modal">
                    <ProfileCard onClose={toggleProfileCard} />
                  </div>
                )}
              </li>
              <li className="nav-item mx-3">
                <button
                  className="btn btn-light text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
