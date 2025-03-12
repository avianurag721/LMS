import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../../components";
import useTestSearch from "../../components/UseTestSearch";
import { useStateContext } from "../../contexts/ContextProvider";
import { useLocation } from "react-router-dom";
import { AiOutlineConsoleSql } from "react-icons/ai";
import axios from "axios";
import { dataBinding } from "@syncfusion/ej2/kanban";

const VisitCreation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { currentColor } = useStateContext();

  const location = useLocation();
  const patient = location.state;

  const [query, setQuery] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);
  const { tests, debouncedSearch } = useTestSearch();

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSelectTest = (test) => {
    setSelectedTests((prevTests) =>
      prevTests.some((t) => t._id === test._id)
        ? prevTests
        : [...prevTests, test]
    );
    console.log(selectedTests);
    setQuery("");
  };
  const handleRemoveTest = (testId) => {
    setSelectedTests((prevTests) => prevTests.filter((t) => t._id !== testId));
    console.log(selectedTests);
  };

  const onSubmit = async (data) => {
    try {
      console.log("before creating Visit :", { ...data, selectedTests });
    const dataToSend = { ...data, selectedTests };
    console.log(dataToSend);
    const res = await axios.post(
      "http://localhost:9876/lis/visit/register",
      dataToSend
    );
    console.log("after submitting response", res.data);
    // reset();
    // setSelectedTests([]);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="m-2 md:m-2 p-4 relative md:p-10 bg-gray-200 md:rounded-3xl rounded-xl">
      <Header category="Page" title="Register" />

      <input
        type="text"
        placeholder="Search test by name..."
        className="p-2 text-black mb-4 border rounded w-full"
        value={query}
        onChange={handleSearch}
      />

      {tests.length > 0 && (
        <ul
          style={{ backgroundColor: currentColor }}
          className="w-[40%] right-10 absolute rounded shadow-md"
        >
          {tests.map((test) => (
            <li
              key={test.id}
              className="border-b p-2  cursor-pointer hover:bg-yellow-100"
              onClick={() => handleSelectTest(test)}
            >
              {test?.testName}
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md mt-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Patient ID</label>
            <input
              type="text"
              value={patient._id}
              readOnly
              {...register("patientId", { required: "Patient ID is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.patientId && (
              <p className="text-red-500 text-sm">{errors.patientId.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">Payment Status</label>
            <select
              {...register("paymentStatus", {
                required: "Payment status is required",
              })}
              className="w-full p-2 border rounded"
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
              <option value="Partially Paid">Partially Paid</option>
            </select>
            {errors.paymentStatus && (
              <p className="text-red-500 text-sm">
                {errors.paymentStatus.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            style={{ backgroundColor: currentColor }}
            className="w-full  text-white p-2 rounded hover:bg-blue-600"
          >
            Register Visit
          </button>
        </div>
      </form>
      {selectedTests.length > 0 ? (
        <div className="col-span-2">
          <label className="block text-xl mt-2 mb-1 font-semibold">
            Selected Tests
          </label>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border">Test Name</th>
                  <th className="p-2 border">Test Code</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Discount</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedTests.map((test) => (
                  <tr key={test.id} className="border-b">
                    <td className="p-2 border">{test.testName}</td>
                    <td className="p-2 border">{test.testCode || "N/A"}</td>
                    <td className="p-2 border">₹{test.price}</td>
                    <td className="p-2 border">{test.discount}%</td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => handleRemoveTest(test._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default VisitCreation;
