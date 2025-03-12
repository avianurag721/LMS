import { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import axios from "axios";

const useSearch = (type) => {
  console.log(type)
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://lmsbackend-fgnp.onrender.com/lis/${type}/search`,
        { params: { query } }
      );
      console.log(`Fetched ${type}:`, response.data);
      setResults(response.data);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Ensure debounce is created only once
  const debouncedSearch = useCallback(debounce(fetchResults, 300), []);

  return { results, loading, debouncedSearch };
};

export default useSearch;
