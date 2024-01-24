import { useState, useEffect } from 'react';
import axios from 'axios'; 

const useFetchEmpresas = (page, name = '') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        
        let url = `http://127.0.0.1:8000/api/Empre/empre/all?page=${page}`;
        if (name) url += `&name=${name}`;

        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresas();
  }, [page, name]); 

  return { data, loading, error };
};

export default useFetchEmpresas;
