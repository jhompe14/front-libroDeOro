import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { queryFetch } from '../helpers/queryFetch';

export const useQueryFetch = (url, setStateObject) => {

    const isMounted = useRef(true);
    const [state, setstate] = useState({loading: null, error: null});

    useEffect(()=>{
        return () =>{
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {
        queryFetch(url)
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

useQueryFetch.prototype = {
    url : PropTypes.string.isRequired,
    setStateObject: PropTypes.func.isRequired,    
}
