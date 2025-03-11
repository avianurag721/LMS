import { useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const useTestSearch = () => {
  const [tests, setTests] = useState([]);

  const fetchTests = async (query) => {
    if (!query) {
      setTests([]);
      return;
    }
    try {
        const response = await axios.get(`http://localhost:9876/lis/test/search`, { params: { query } });
        console.log(response)
      setTests(response.data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchTests, 500), []);

  return { tests, debouncedSearch };
};

export default useTestSearch;
