import { useState, useCallback, useRef, useEffect } from 'react';

export const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (
        url,
        method = 'GET',
        body = null,
        headers = {}
    ) => {
        setIsLoading(true);
        setError(null);

        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            });

            const responseData = await response.json();
            activeHttpRequests.current = activeHttpRequests.current.filter(
                abortCtrl => abortCtrl !== httpAbortCtrl
            );

            if (!response.ok) {
                const error = new Error(responseData.message || 'Request failed');
                error.response = responseData;
                throw error;
            }

            setIsLoading(false);
            return responseData;
        } catch (error) {
            setIsLoading(false);
            setError(error);
            throw error;
        }
    }, []);

    const onCloseError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return { isLoading, error, sendRequest, onCloseError };
};

export default useFetch;
