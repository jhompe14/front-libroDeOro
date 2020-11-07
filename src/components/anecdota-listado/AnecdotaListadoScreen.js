import React, {useState} from 'react'
import Pagination from "react-js-pagination";


export const AnecdotaListadoScreen = () => {

    const[products, setProductos] = useState([
        { id: 1, name: 'George', animal: 'Monkey' },
        { id: 2, name: 'Jeffrey', animal: 'Giraffe' },
        { id: 3, name: 'Alice', animal: 'Giraffe' },
        { id: 4, name: 'Alice', animal: 'Tiger' },
        { id: 5, name: 'George', animal: 'Monkey' },
    ]);
        
    
    const handlePageChange = (pageNumber) =>{
        alert("hola"+pageNumber);
    }

      
    
      return (
        <div className="App">
          <h5>React Bootstrap Table Next with Sorting</h5>
    
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={1}
            itemsCountPerPage={5}
            totalItemsCount={1500}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            /> 
        </div>
      );
}
