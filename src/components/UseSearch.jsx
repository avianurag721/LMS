import { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import axios from "axios";

const usePatientSearch = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPatients = async (query) => {
    if (!query) {
      setPatients([]); // Clear results if input is empty
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("https://lmsbackend-fgnp.onrender.com/lis/patient/search", {
        params: { query },
      });

      console.log("Fetched Patients:", response.data);
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce API call (waits 300ms after user stops typing)
  const debouncedSearch = useCallback(debounce(fetchPatients, 300), []);

  return { patients, loading, debouncedSearch };
};

export default usePatientSearch;
