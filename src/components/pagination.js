import React from 'react';
import './style.css'
import { ImPrevious2, ImNext2 } from "react-icons/im";

const Pagination = ({totalPages, currentPage, setCurrentPage}) => {
    const totalPageNumbers = Array.from({length: totalPages}, (_, index) => index + 1);
    const nextPage = () => {
        if(currentPage !== totalPages) 
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) 
            setCurrentPage(currentPage - 1)
    }
    
  return (
    <div>
        <ul className='styledPageNumber'>
            <li>
                <button onClick={prevPage}><ImPrevious2 style={{color: 'blue'}}/></button>
            </li>
            {totalPageNumbers?.map((pageNumber, index)=>{
                return(
                    <li   key={pageNumber}><button className={pageNumber === currentPage? 'activePage' : ''} onClick={()=>setCurrentPage(pageNumber)}>{pageNumber}</button></li>
                )
            })}
            <li>
                <button onClick={nextPage}><ImNext2 style={{color: 'blue'}} /></button>
            </li>
        </ul>
    </div>
  )
}

export default Pagination