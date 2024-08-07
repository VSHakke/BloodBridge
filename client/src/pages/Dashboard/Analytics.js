// import React, { useState, useEffect } from "react";
// import Header from "../../components/shared/Layout/Header";
// import API from "./../../services/API";
// import moment from "moment";

// const Analytics = () => {
//   const [data, setData] = useState([]);
//   const [inventoryData, setInventoryData] = useState([]);
//   const colors = [
//     "#884A39",
//     "#C38154",
//     "#FFC26F",
//     "#4F709C",
//     "#4942E4",
//     "#0079FF",
//     "#FF0060",
//     "#22A699",
//   ];
//   //GET BLOOD GROUP DATA
//   const getBloodGroupData = async () => {
//     try {
//       const { data } = await API.get("/analytics/git remote add origin https://github.com/your-username/your-repository-name.git
//s-data");
//       if (data?.success) {
//         setData(data?.bloodGroupData);
//         // console.log(data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //lifrecycle method
//   useEffect(() => {
//     getBloodGroupData();
//   }, []);

//   //get function
//   const getBloodRecords = async () => {
//     try {
//       const { data } = await API.get("/inventory/get-recent-inventory");
//       if (data?.success) {
//         setInventoryData(data?.inventory);
//         console.log(data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getBloodRecords();
//   }, []);
//   return (
//     <>
//       <Header />
//       <div className="d-flex flex-row flex-wrap">
//         {data?.map((record, i) => (
//           <div
//             className="card m-2 p-1"
//             key={i}
//             style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
//           >
//             <div className="card-body">
//               <h1 className="card-title bg-light text-dark text-center mb-3">
//                 {record.bloodGroup}
//               </h1>
//               <p className="card-text">
//                 Total In : <b>{record.totalIn}</b> (ML)
//               </p>
//               <p className="card-text">
//                 Total Out : <b>{record.totalOut}</b> (ML)
//               </p>
//             </div>
//             <div className="card-footer text-light bg-dark text-center">
//               Total Available : <b>{record.availabeBlood}</b> (ML)
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="container my-3">
//         <h1 className="my-3">Recent Blood Transactions</h1>
//         <table className="table ">
//           <thead>
//             <tr>
//               <th scope="col">Blood Group</th>
//               <th scope="col">Inventory Type</th>
//               <th scope="col">Quantity</th>
//               <th scope="col">Donor Email</th>
//               <th scope="col">Time & Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {inventoryData?.map((record) => (
//               <tr key={record._id}>
//                 <td>{record.bloodGroup}</td>
//                 <td>{record.inventoryType}</td>
//                 <td>{record.quantity} (ML)</td>
//                 <td>{record.email}</td>
//                 <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Analytics;



import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "../../services/API";
import moment from "moment";
import { useSelector } from "react-redux";

const Analytics = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const colors = [
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/analytics/bloodGroups-data");
        if (data?.success) {
          setData(data?.bloodGroupData);
        }
      } catch (error) {
        console.log("Error fetching blood group data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const { data } = await API.get("/inventory/get-recent-inventory");
        if (data?.success) {
          setInventoryData(data?.inventory);
        }
      } catch (error) {
        console.log("Error fetching blood records:", error);
      } finally {
        setIsLoading(false); // Update loading state after fetching data
      }
    };

    fetchInventoryData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  return (
    <>
      <Header />
      {user?.role === "admin" ? (
          <div className="d-flex flex-row flex-wrap">
          {data?.map((record, i) => (
            <div
              className="card m-2 p-1"
              key={i}
              style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
            >
              <div className="card-body">
                <h1 className="card-title bg-light text-dark text-center mb-3">
                  {record.bloodGroup}
                </h1>
                <p className="card-text">
                  Total In : <b>{record.totalIn}</b> (ML)
                </p>
                <p className="card-text">
                  Total Out : <b>{record.totalOut}</b> (ML)
                </p>
              </div>
              <div className="card-footer text-light bg-dark text-center">
                Total Available : <b>{record.totalIn - record.totalOut}</b> (ML)
              </div>
            </div>
          ))}
          <div className="container my-3">
            <h1 className="my-3">Recent Blood Transactions</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Email</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData?.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity} (ML)</td>
                    <td>{record.email}</td>
                    <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-row flex-wrap">
          {data?.map((record, i) => (
            <div
              className="card m-2 p-1"
              key={i}
              style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
            >
              <div className="card-body">
                <h1 className="card-title bg-light text-dark text-center mb-3">
                  {record.bloodGroup}
                </h1>
                <p className="card-text">
                  Total In : <b>{record.totalIn}</b> (ML)
                </p>
                <p className="card-text">
                  Total Out : <b>{record.totalOut}</b> (ML)
                </p>
              </div>
              <div className="card-footer text-light bg-dark text-center">
                Total Available : <b>{record.totalIn - record.totalOut}</b> (ML)
              </div>
            </div>
          ))}
          <div className="container my-3">
            <h1 className="my-3">Recent Blood Transactions</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Email</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData?.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity} (ML)</td>
                    <td>{record.email}</td>
                    <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Analytics;
