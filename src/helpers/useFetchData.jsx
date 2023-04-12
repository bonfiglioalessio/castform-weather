import { useState, useEffect } from "react";

export function useFetchData(url, dependencies) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    fetchData();
  }, [dependencies]);

  return [data, loading];
}
