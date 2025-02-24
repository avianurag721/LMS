import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../../components";
import usePatientSearch from "../../components/UseSearch";
import { TiDocumentAdd } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";

const VisitCreation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [query, setQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { patients, debouncedSearch } = usePatientSearch();

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchedPatient = (patient) => {
    setSelectedPatient(patient);
    setValue("patientId", patient.id);
    setQuery("");
  };

  const onSubmit = (data) => {
    console.log("Visit Created:", data);
    reset();
    setSelectedPatient(null);
  };

  return (
    <div className="m-2 md:m-2 p-4 relative md:p-10 bg-gray-200 md:rounded-3xl rounded-xl">
      <div className="flex justify-between">
        <Header category="Page" title="Register Patient Visit" />
        <input
          type="text"
          placeholder="Search patient by name..."
          className="float-right p-2 text-black mb-4 border rounded"
          value={query}
          onChange={handleSearch}
        />
      </div>

      {patients.length > 0 && (
        <ul className="bg-white w-[40%] lg:w-[25%] right-5 absolute p-1 rounded shadow-md">
          {patients.map((patient) => (
            <div key={patient.id} className="flex justify-between hover:bg-yellow-100">
              <li className="border-b p-2 cursor-pointer flex-grow">
                {patient.name} - ({patient.age}) - {patient.gender}
                <p>{patient.contact}</p>
              </li>
              <div className="flex gap-5 justify-center items-center w-[30%]">
                <TiDocumentAdd size={30} className="text-2xl text-blue-500 hover:text-red-600 cursor-pointer" />
                <FaEdit onClick={() => handleSearchedPatient(patient)} size={25} className="text-2xl text-blue-500 hover:text-red-600 cursor-pointer" />
              </div>
            </div>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Visit ID</label>
            <input
              type="text"
              value={`VISIT-${Date.now()}`}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Patient ID</label>
            <input
              type="text"
              {...register("patientId", { required: "Patient ID is required" })}
              className="w-full p-2 border rounded"
              readOnly
            />
            {errors.patientId && <p className="text-red-500 text-sm">{errors.patientId.message}</p>}
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-semibold">Tests</label>
            <select {...register("tests", { required: "At least one test is required" })} className="w-full p-2 border rounded" multiple>
              <option value="Blood Test">Blood Test</option>
              <option value="X-Ray">X-Ray</option>
              <option value="MRI">MRI</option>
              <option value="CT Scan">CT Scan</option>
              <option value="ECG">ECG</option>
            </select>
            {errors.tests && <p className="text-red-500 text-sm">{errors.tests.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Sample Collected By</label>
            <input type="text" {...register("sampleCollectedBy")} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Sample Collection Date</label>
            <input type="date" {...register("sampleCollectionDate")} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Payment Status</label>
            <select {...register("paymentStatus", { required: "Payment status is required" })} className="w-full p-2 border rounded">
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
              <option value="Partially Paid">Partially Paid</option>
            </select>
            {errors.paymentStatus && <p className="text-red-500 text-sm">{errors.paymentStatus.message}</p>}
          </div>
        </div>

        <div className="mt-4">
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Register Visit
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisitCreation;
