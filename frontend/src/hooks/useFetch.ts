import {useState,useEffect} from "react";


export function useFetch<T>(url: string): { data: T | undefined; loading: boolean; error: string | null } {
    const [data, setData] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
         fetch(url)
            .then(res => res.json())
            .then((data: T) => setData(data))
        .catch(err => {setError(err.message)})
         .finally(() => setLoading(false));
    }, [url]);


    return {data,loading,error};
}