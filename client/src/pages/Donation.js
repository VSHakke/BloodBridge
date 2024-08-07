import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import { useSelector } from "react-redux";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  //find donor records
  const getDonors = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",
          donor: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonors();
  }, []);

  // VSH
  return (
    <Layout>
      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              {/* <th scope="col">Inventory TYpe</th> */}
              <th scope="col">Blood Quantity(ml)</th>
              <th scope="col">Organisation</th>
              <th scope="col">Date</th>
              {/* VSH */}
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                {/* <td>{record.inventoryType}</td> */}
                <td>{record.quantity}</td>
                <td>{record.organisationName}</td> {/* Accessing organisation name */}
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                {/* VSH */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Donation;
