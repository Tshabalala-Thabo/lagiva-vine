import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

const useFetchCategories = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url); // Use axios to fetch data
                setData(response.data); // Set the data from the response
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [url]);

    return { data, error };
};

export default useFetchCategories;