import { useState } from 'react';


export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = ( newFormState = initialState ) => {
        setValues( newFormState );
    }


    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    const handleObjectChange = (objectChange) => {
        if(objectChange){
            setValues(objectChange);
        }        
    } 

    return [ values, handleInputChange, handleObjectChange, reset ];

}