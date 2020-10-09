import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

export const useFetchQuery = (url, setStateObject) => {

    const isMounted = useRef(true);
    const [state, setstate] = useState({loading: null, error: null});

    useEffect(()=>{
        return () =>{
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {
        fetch(url)
            .then(resp => resp.json())
            .then(data =>{
                if(isMounted.current) {
                    setStateObject(data);
                    setstate({
                        loading: false,
                        error: null
                    });
                }
            })
            .catch(err => {
                if(isMounted.current) {
                    setstate({
                        loading: false,
                        error: err
                    });
                }
            });
    }, [url])

    return state;
}

useFetchQuery.prototype = {
    url : PropTypes.string.isRequired,
    setStateObject: PropTypes.func.isRequired
    
}
