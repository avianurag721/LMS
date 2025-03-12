import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../components";
import usePatientSearch from "../components/UseSearch";
import { TiDocumentAdd } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useSearch from "../components/UseSearch";

const PatientRegistration = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [ageOption, setAgeOption] = useState("dob"); // Default selection

  // const { patients, loading, debouncedSearch } = usePatientSearch();
  const { results: patients, loading: patientLoading, debouncedSearch: searchPatients } = useSearch("patient");


  useEffect(() => {
    searchPatients(query);
  }, [query, searchPatients]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchedPatient = (patient) => {
    setSelectedPatient(patient);
    setValue("name", patient.name);
    setValue("age", patient.age);
    setValue("gender", patient.gender);
    setValue("contact", patient.contact);
    setValue("address", patient.address);
    setValue("prefix", patient?.prefix);

    setQuery(null);
  };

  const handlePatientVisit = (patient) => {
    navigate("/visit-creation", { state: patient });
  };

  const handleOptionChange = (e) => {
    setAgeOption(e.target.value);
    setValue("dob", "");
    setValue("ageValue", "");
    setValue("ageUnit", "Years");
  };

  const onSubmit = (data) => {
    console.log("New Patient Registered:", data);
    reset(); // Reset form after submission
    setQuery(null);
  };

  return (
    <div className="m-2 md:m-2 p-4 relative md:p-10 bg-gray-200 md:rounded-3xl rounded-xl">
      <div className="flex justify-between">
        <Header category="Page" title=" Registration" />

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search patient by name..."
          className="float-right p-2 text-black mb-4 border rounded"
          value={query}
          onChange={handleSearch}
        />
      </div>

      {/* Display Search Results */}
      {patients.length > 0 && (
        <ul className="bg-white w-[40%] lg:w-[30%] right-5 absolute p-1 rounded shadow-md">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="flex justify-between  hover:bg-yellow-100"
            >
              <li className="border-b p-2 cursor-pointer flex-grow">
                {patient.name} - ({patient.age}) - {patient.gender}
                <p>{patient.contact}</p>
              </li>
              <div className="flex gap-5 justify-center items-center w-[30%]">
                <div className="relative group">
                  <TiDocumentAdd
                    onClick={() => handlePatientVisit(patient)}
                    size={30}
                    className="text-2xl text-blue-500 hover:text-red-600 cursor-pointer"
                  />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Create Visit
                  </span>
                </div>
                <div className="relative group">
                  <FaEdit
                  onClick={() => handleSearchedPatient(patient)}
                  size={25}
                    className="text-2xl text-blue-500 hover:text-red-600 cursor-pointer"
                  />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Edit Details
                  </span>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}

      {/* Patient Registration Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md mt-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Prefix */}
          <div>
            <label className="block mb-1 font-semibold">Prefix</label>
            <select
              {...register("prefix", { required: "Prefix is required" })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Prefix</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Master">Master</option>
              <option value="Miss">Miss</option>
            </select>
            {errors.prefix && (
              <p className="text-red-500 text-sm">{errors.prefix.message}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Age/DOB Selection */}
          <div className="col-span-2">
            <label className="block mb-1 font-semibold">
              Choose Age Input Method:
            </label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  value="dob"
                  checked={ageOption === "dob"}
                  onChange={handleOptionChange}
                />{" "}
                Date of Birth (DOB)
              </label>
              <label>
                <input
                  type="radio"
                  value="age"
                  checked={ageOption === "age"}
                  onChange={handleOptionChange}
                />{" "}
                Enter Age
              </label>
            </div>
          </div>

          {/* DOB Input */}
          {ageOption === "dob" && (
            <div>
              <label className="block mb-1 font-semibold">Date of Birth</label>
              <input
                type="date"
                {...register("dob", {
                  required: ageOption === "dob" ? "DOB is required" : false,
                })}
                className="w-full p-2 border rounded"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm">{errors.dob.message}</p>
              )}
            </div>
          )}

          {/* Age Input (Years, Months, Days) */}
          {ageOption === "age" && (
            <div>
              <label className="block mb-1 font-semibold">Age</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  {...register("ageValue", {
                    required: ageOption === "age" ? "Age is required" : false,
                  })}
                  className="w-full p-2 border rounded"
                  placeholder="Enter age"
                />
                <select {...register("ageUnit")} className="p-2 border rounded">
                  <option value="Years">Years</option>
                  <option value="Months">Months</option>
                  <option value="Days">Days</option>
                </select>
              </div>
              {errors.ageValue && (
                <p className="text-red-500 text-sm">
                  {errors.ageValue.message}
                </p>
              )}
            </div>
          )}

          {/* Gender */}
          <div>
            <label className="block mb-1 font-semibold">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block mb-1 font-semibold">Contact</label>
            <input
              type="text"
              {...register("contact", {
                required: "Contact is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-semibold">Address</label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistration;
