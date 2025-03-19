import { useEffect } from "react";

const UseFetch = (url, dependency = [], states = []) => {
  const [setResult, setError, setLoading] = states;
  useEffect(() => {
    (async () => {
      setError(null);
      setLoading(true);
      setResult(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const res = await response.json();
        setResult(res);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setResult(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [...dependency]);
};

export default UseFetch;
